
# User Microservice
# Build image
# docker build --no-cache=false -t rapydbot/user -f Dockerfile .
# Run container
# docker run -p 30041:30041 rapydbot/user

FROM node:12-slim
LABEL maintainer="susguzman"

ENV SECRET_NAME="service-api-key" \
    SKIP_SECRET_FILE=false

WORKDIR /app/src/rapydbot/user

COPY . .

RUN apt-get update && \
    apt-get install jq -y && \
    sh install.sh

CMD ["/bin/bash", "entrypoint.sh"]
