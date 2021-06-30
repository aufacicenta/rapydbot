#/bin/bash
# Entrypoint for Wallet Microservice

## Load env variables

SECRET_FILE=/mnt/secrets-store/$SECRET_NAME
if [ -f "$SECRET_FILE" ]; then
    echo "# Loading secrets from $SECRET_FILE"
    # Service
    export NODE_ENV=$(cat $SECRET_FILE | jq -r '.NODE_ENV')
    export IP_ADDRESS=$(cat $SECRET_FILE | jq -r '.IP_ADDRESS')
    export HTTP_PORT=$(cat $SECRET_FILE | jq -r '.WALLET_HTTP_PORT')
    # Mysql
    export MYSQL_ROOT_USER=$(cat $SECRET_FILE | jq -r '.username')
    export MYSQL_ROOT_PASSWORD=$(cat $SECRET_FILE | jq -r '.password')
    export MYSQL_HOST=$(cat $SECRET_FILE | jq -r '.MYSQL_HOST')
    export MYSQL_PORT=$(cat $SECRET_FILE | jq -r '.MYSQL_PORT')
    export MYSQL_DATABASE=$(cat $SECRET_FILE | jq -r '.MYSQL_DATABASE')
    # Rapyd creds
    export RAPYD_ACCESS_KEY=$(cat $SECRET_FILE | jq -r '.RAPYD_ACCESS_KEY')
    export RAPYD_SECRET_KEY=$(cat $SECRET_FILE | jq -r '.RAPYD_SECRET_KEY')
    export RAPYD_BASE_URL=$(cat $SECRET_FILE | jq -r '.RAPYD_BASE_URL')
    export RAPYD_SALT_LENGTH=$(cat $SECRET_FILE | jq -r '.RAPYD_SALT_LENGTH')
else 
    echo "# Secrets file does not exist!"
fi

## Start Service
yarn start
