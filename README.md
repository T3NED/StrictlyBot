<div align="center">
    <img src="https://imgur.com/Vs0bNqg.png" align="center" width="25%" alt="">
</div>

# Strictly Bot

A Discord utility bot for [Strictly Siege](https://discord.gg/NbHZzDxf59).

## Installation

Please note that you only need to do steps 2, 3 and 4 if you don't plan to use Docker.

0. Create a bot application on the [Discord Developer Portal](https://discord.com/developers).
1. Clone this repository to your machine.
2. Install [NodeJS](https://nodejs.org/en/) and [Postgresql](https://www.postgresql.org/).
3. Install [yarn](https://yarnpkg.com/).
4. Install modules with `yarn install`.
5. Copy the `.env.example` file to a `.env` file and configure the bot.

## Deploy

### Production

0. Install [Docker](https://docs.docker.com/get-docker/) and [Docker Compose](https://docs.docker.com/compose/install/)
1. Run `yarn image` to build the Docker image.
2. Run `docker-compose up` to start the bot.

### Development

0. Run `yarn migrate` to apply the database migrations.
1. Run `yarn build` to build the bot.
2. Run `yarn start` to run the bot.
