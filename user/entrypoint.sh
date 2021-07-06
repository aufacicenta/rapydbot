#/bin/bash
# Entrypoint for User Microservice

## Load env variables

SECRET_FILE=/mnt/secrets-store/$SECRET_NAME
if [ -f "$SECRET_FILE" ] && [ "$SKIP_SECRET_FILE" = false ] ; then
    echo "# Loading secrets from $SECRET_FILE"
    # Mysql
    export MYSQL_ROOT_USER=$(cat $SECRET_FILE | jq -r '.username')
    export MYSQL_ROOT_PASSWORD=$(cat $SECRET_FILE | jq -r '.password')
    export MYSQL_HOST=$(cat $SECRET_FILE | jq -r '.db_host')
    export MYSQL_PORT=$(cat $SECRET_FILE | jq -r '.port')
    export MYSQL_DATABASE=$(cat $SECRET_FILE | jq -r '.db_user')
else 
    echo "# Secrets were not loaded from file!"
fi

## Start Service
yarn start
