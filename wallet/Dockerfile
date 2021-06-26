
# Wallet Microservice
# Build image
# docker build --no-cache=false -t rapydbot/wallet -f Dockerfile .
# Run container
# docker run -p 30042:30042 rapydbot/wallet

FROM node:12-slim
LABEL maintainer="susguzman"

ENV SECRET_NAME="service-api-key"

WORKDIR /app/src/rapydbot/wallet

COPY . .

RUN apt-get update && \
    apt-get install jq -y && \    
    sh install.sh

CMD ["/bin/bash", "entrypoint.sh"]
