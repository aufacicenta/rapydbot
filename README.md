# Rapyd Bot

## Getting Started

### Bring it to life

Clone this repo and create a `.env` file in the project root:

```
export BOT_TOKEN='YOUR_BOT_TOKEN'
```

Then run `yarn && yarn start:debug`.

### Talk to your bot

Search for your bot by its name in your Telegram app and `/start` it.

## Development (BOT)

### Starting Point

The `Bot.ts` file is the main configuration of your bot. Replies are handled by this file.

### Commands

To create a new command...

@TODO

## Development (Microservices)

The business logic of the Bot is handled by its microservices. Microservices consist of a MySQL database handled by `sequelize` hosted on a Docker container. Inter-service communication is handled by a gRPC server.

Running `sh install.sh` on each microservice directory, it's controller methods will be exposed to other microservices and the Bot (if required).

### Importing a microservice

`cd` into the microservice directory and run `source .env && sh install.sh`. This will expose the microservice as a node package.

`cd` into another microservice or the `bot` and run `yarn link @rapydbot/user`, for linking the `@rapydbot/user` mcs, for example.

### Creating a Microservice

@TODO

### Database Setup

`source .env && cd src/database && docker-compose up -d`

\* Make sure that a Docker daemon is running

### gRPC Server setup

`source .env && yarn start`
