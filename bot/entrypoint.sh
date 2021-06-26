#/bin/bash
# Entrypoint for Bot Microservice

## Load env variables

SECRET_FILE=/mnt/secrets-store/$SECRET_NAME
if [ -f "$SECRET_FILE" ]; then
    echo "# Loading secrets from $SECRET_FILE"
    # Service
    export NODE_ENV=$(cat $SECRET_FILE | jq -r '.NODE_ENV')
    export BOT_TOKEN=$(cat $SECRET_FILE | jq -r '.BOT_TOKEN')
    export USER_SERVICE_URL=$(cat $SECRET_FILE | jq -r '.USER_SERVICE_URL')
    export WALLET_SERVICE_URL=$(cat $SECRET_FILE | jq -r '.WALLET_SERVICE_URL')
else 
    echo "# Secrets file does not exist!"
fi

## Start Service
yarn start:debug
