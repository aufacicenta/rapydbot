#/bin/bash
# Entrypoint for Bot Microservice

## Load env variables

SECRET_FILE=/mnt/secrets-store/$SECRET_NAME
if [ -f "$SECRET_FILE" ] && [ "$SKIP_SECRET_FILE" = false ] ; then
    echo "# Loading secrets from $SECRET_FILE"
    export BOT_TOKEN=$(cat $SECRET_FILE | jq -r '.bot_token')
else 
    echo "# Secrets were not loaded from file!"
fi

## Start Service
yarn start:debug
