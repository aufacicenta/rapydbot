# Bot Microservice
# Build image
# docker build --no-cache=false -t rapydbot/bot -f bot/Dockerfile .
# Run container
# docker run rapydbot/bot

FROM node:12-slim
LABEL maintainer="susguzman"

ENV SECRET_NAME="service-api-key"

WORKDIR /app/src/rapydbot

COPY . .

RUN apt-get update && \
    apt-get install jq -y 

RUN cd /app/src/rapydbot/wallet && sh install.sh

RUN cd /app/src/rapydbot/user && sh install.sh

WORKDIR /app/src/rapydbot/bot

RUN yarn link @rapydbot/wallet && \
    yarn link @rapydbot/user && \
    yarn

CMD ["/bin/bash", "entrypoint.sh"]