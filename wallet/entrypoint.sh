#/bin/bash
# Entrypoint script for Wallet Microservice

## Load env variables

SECRET_FILE=/mnt/secrets-store/$SECRET_NAME
if [ -f "$SECRET_FILE" ] && [ "$SKIP_SECRET_FILE" = false ] ; then
    echo "# Loading secrets from $SECRET_FILE"
    # Mysql
    export MYSQL_ROOT_USER=$(cat $SECRET_FILE | jq -r '.username')
    export MYSQL_ROOT_PASSWORD=$(cat $SECRET_FILE | jq -r '.password')
    export MYSQL_HOST=$(cat $SECRET_FILE | jq -r '.db_host')
    export MYSQL_PORT=$(cat $SECRET_FILE | jq -r '.port')
    export MYSQL_DATABASE=$(cat $SECRET_FILE | jq -r '.db_wallet')
    # Rapyd creds
    export RAPYD_ACCESS_KEY=$(cat $SECRET_FILE | jq -r '.rapyd_access_key')
    export RAPYD_SECRET_KEY=$(cat $SECRET_FILE | jq -r '.rapyd_secret_key')
else 
    echo "# Secrets were not loaded from file!"
fi

## Start Service
yarn start
