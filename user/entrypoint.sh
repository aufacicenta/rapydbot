#/bin/bash
# Entrypoint for User Microservice

## Load env variables

SECRET_FILE=/mnt/secrets-store/$SECRET_NAME
if [ -f "$SECRET_FILE" ]; then
    echo "# Loading secrets from $SECRET_FILE"
    # Service
    export NODE_ENV=$(cat $SECRET_FILE | jq -r '.NODE_ENV')
    export IP_ADDRESS=$(cat $SECRET_FILE | jq -r '.IP_ADDRESS')
    export HTTP_PORT=$(cat $SECRET_FILE | jq -r '.USER_HTTP_PORT')
    export HTTP_TEST_PORT=$(cat $SECRET_FILE | jq -r '.HTTP_TEST_PORT')
    export SERVER_ENDPOINT=$(cat $SECRET_FILE | jq -r '.SERVER_ENDPOINT')
    # Mysql
    export MYSQL_ROOT_USER=$(cat $SECRET_FILE | jq -r '.username')
    export MYSQL_ROOT_PASSWORD=$(cat $SECRET_FILE | jq -r '.password')
    export MYSQL_HOST=$(cat $SECRET_FILE | jq -r '.MYSQL_HOST')
    export MYSQL_PORT=$(cat $SECRET_FILE | jq -r '.MYSQL_PORT')
    export MYSQL_DATABASE=$(cat $SECRET_FILE | jq -r '.MYSQL_DATABASE')
else 
    echo "# Secrets file does not exist!"
fi

## Start Service
yarn start
