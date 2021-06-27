from aws_cdk import core as cdk
from aws_cdk import core
from aws_cdk import aws_s3 as s3
import aws_cdk.aws_ec2 as ec2 #pip install aws-cdk.aws-ec2
import aws_cdk.aws_eks as eks #pip install aws-cdk.aws-eks
import aws_cdk.aws_iam as iam #pip install aws-cdk.aws-iam
import aws_cdk.aws_rds as rds #pip install aws-cdk.aws-rds
import aws_cdk.aws_secretsmanager as sm #pip install aws-cdk.aws_secretsmanager
import aws_cdk.aws_route53 as route53 #pip install aws-cdk.aws_route53

import yaml #pip install pyyaml
import requests #pip install requests
import os

class InfraStack(cdk.Stack):

    def __init__(self, scope: cdk.Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        ####################
        # Load ENV VARS
        ####################
        
        p_secret_arn = os.getenv("SECRET_ARN", "")

        if p_secret_arn == "":
            print("SECRET_ARN env var is required!")
            os._exit(1)

        ####################
        # VPC
        ####################

        vpc = ec2.Vpc(self, "vpc",
                      max_azs=2,
                      nat_gateway_provider=ec2.NatProvider.instance(instance_type=ec2.InstanceType("t3a.micro")))

        ####################
        # Kubernetes Cluster
        ####################

        # EKS Cluster
        cluster = eks.Cluster(self, "rapyd-eks",
            version=eks.KubernetesVersion.V1_20,
            cluster_name="rapyd-cluster",
            default_capacity=2,
            default_capacity_instance=ec2.InstanceType.of(ec2.InstanceClass.BURSTABLE3_AMD, ec2.InstanceSize.MEDIUM),
            vpc=vpc
        )

        # Add admin user for EKS
        cluster.aws_auth.add_user_mapping(iam.User.from_user_name(self, "adminUser", "poguz"), groups=["system:masters"])

        # Add service account
        sa = cluster.add_service_account('rapyd-secret-sa', name="rapyd-secret-sa")

        sa.add_to_principal_policy(iam.PolicyStatement(effect=iam.Effect.ALLOW,
                                    actions=["secretsmanager:GetSecretValue", "secretsmanager:DescribeSecret"],
                                    resources=[p_secret_arn]))

        # CSI Chart
        cluster.add_helm_chart("csi-secrets-store",
            release="csi-secrets-store",
            chart="secrets-store-csi-driver",
            values={
                "syncSecret.enabled": True
            },
            repository="https://raw.githubusercontent.com/kubernetes-sigs/secrets-store-csi-driver/master/charts",
            namespace="kube-system"
        )

        # Installing the AWS Provider
        manifest = yaml.safe_load_all(requests.get("https://raw.githubusercontent.com/aws/secrets-store-csi-driver-provider-aws/main/deployment/aws-provider-installer.yaml").text)
        for i, doc in enumerate(manifest):
            cluster.add_manifest("ascpResource" + str(i), doc)
        
        ####################
        # MYSQL Cluster
        ####################
        
        # Read Secret
        secret_rapyd = sm.Secret.from_secret_arn(self, "dbCreds", p_secret_arn)

        # DB Security group
        sg_aurora = ec2.SecurityGroup(self, 'sgAurora', vpc=vpc, security_group_name= "AuroraMysql")
        sg_aurora.add_ingress_rule(cluster.cluster_security_group, ec2.Port.tcp(3306))

        # Create cluster
        dbCluster = rds.DatabaseCluster(self, "database",
                                        engine=rds.DatabaseClusterEngine.aurora_mysql(version=rds.AuroraMysqlEngineVersion.VER_2_09_2),
                                        credentials=rds.Credentials.from_secret(secret_rapyd),
                                        cluster_identifier="db-cluster",
                                        instances=1,
                                        instance_props=rds.InstanceProps(
                                            vpc=vpc,
                                            vpc_subnets=ec2.SubnetSelection(subnet_type=ec2.SubnetType.PRIVATE),
                                            instance_type=ec2.InstanceType("t3.small"),
                                            security_groups=[sg_aurora]
                                        ))

        ####################
        # Privete DNS Zone
        ####################

        # Create dns zone
        zone_pv = route53.PrivateHostedZone(self, 'zonaPrivada',
                                            vpc=vpc,
                                            zone_name="rapydbot.local")

        # DB Write Record
        db_record = route53.CnameRecord(self, 'dbWriteRecord',
                                        domain_name=dbCluster.cluster_endpoint.hostname,
                                        record_name='db',
                                        zone=zone_pv,
                                        ttl=core.Duration.minutes(1))

        # DB Read Record
        route53.CnameRecord(self, 'dbReadRecord',
                            domain_name=dbCluster.cluster_read_endpoint.hostname,
                            record_name='db-ro',
                            zone=zone_pv,
                            ttl=core.Duration.minutes(1))

        ####################
        # Deploy APP
        ####################
        
        #################
        # Secret Resource

        # Read manifest
        document = open('k8s/secreto.yaml', 'r')
        manifest = yaml.safe_load_all(document).__next__()

        # Set secreat
        manifest['spec']['parameters']['objects'] = '- objectName: "' + secret_rapyd.secret_name + '"\n  objectType: "secretsmanager"\n'

        # Create Resorce
        secret_r = cluster.add_manifest('customSecretR', manifest)

        ############################
        # Create Wallet Microservice

        # Read manifest
        document = open('k8s/wallet.yaml', 'r')
        manifest = yaml.safe_load_all(document)

        # Create Resorces
        for i, doc in enumerate(manifest):
            resource = cluster.add_manifest('wallet' + doc['kind'] + 'R', doc)
            if doc['kind'] == "Deployment":
                resource.node.add_dependency(db_record)
                resource.node.add_dependency(secret_r)
        
        ##########################
        # Create User Microservice

        # Read manifest
        document = open('k8s/user.yaml', 'r')
        manifest = yaml.safe_load_all(document)

        # Create Resorces
        for i, doc in enumerate(manifest):
            resource = cluster.add_manifest('user' + doc['kind'] + 'R', doc)
            if doc['kind'] == "Deployment":
                resource.node.add_dependency(db_record)
                resource.node.add_dependency(secret_r)

        ##########################
        # Create Bot Microservice

        # Read manifest
        document = open('k8s/bot.yaml', 'r')
        manifest = yaml.safe_load_all(document)

        # Create Resorces
        for i, doc in enumerate(manifest):
            resource = cluster.add_manifest('bot' + doc['kind'] + 'R', doc)
            if doc['kind'] == "Deployment":
                resource.node.add_dependency(db_record)
                resource.node.add_dependency(secret_r)
