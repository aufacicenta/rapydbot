# RapydBot - Up and Running

Here you will find everything you need to know to be able to run and test **@rapydbot** in your own local environment.
<br>
<br>

## Prerequisites

Before you begin, check that you have the following programs installed on your computer:
<br>
<br>

- [Git](https://git-scm.com/downloads)
- [Ngrok](https://ngrok.com/download)
- [Node JS - Stable Version](https://nodejs.org/es/download/)
- [Yarn](https://yarnpkg.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- A command line tool like Bash or Zsh

If you are a Windows user we recommend you to install and use [WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10). Make sure to follow the instructions provided  
for the installation of the above programs based on your operating system.

Additionally we assume that you have knowledge or previous experience using the following tools and technologies:

- Git
- Bash or Powershell
- Docker CLI
- Docker Compose
- Yarn

<br>
Don't worry, if you don't have previous experience with any of these tools, you can continue with the tutorial, knowing how  
  
they work will only make the process faster.
<br>
<br>

## Up and Running

Follow the below steps to have your own **@rapydbot** instance ready for testing:

1. <a href="#reposetup">Clone or Download The RapydBot Repository</a>
2. <a href="#telegramsetup">Request your access token to the Telegram Bot API</a>
3. <a href="#rapydsetup">Request your access keys to the Rapyd API</a>
4. <a href="#envvarssetup">Prepare your environment variables</a>
5. <a href="#dbsetup">DB Setup</a>
6. <a href="#grpcsetup">Microservices Setup</a>
7. <a href="#botrunning">Start Your RapydBot Instance</a>

### Optional Configuration:

This steps are optional but if you want to use all the features it's recommended that you follow them.

- <a href="#rapydhooksetup">Setting Up the Top-up Webhook</a>
- <a href="#rapydhooksetup">Setting Up the Transfer Webhook</a>
  <br>
  <br>

## Troubleshooting

Problems with your **@rapydbot** instance?  
We got you covered, Visit the following [document](troubleshooting.md) which describes some of the most common boot/installation problems.

<br>

<h2 id="reposetup">Cloning The Repo</h2>
<br>
As a first step you must clone or download this repository:
<br>
<br>

```bash
  git clone https://github.com/aufacicenta/rapydbot.git
```

Once you have a clone of the repository in your local make sure you are in the master branch.

<br>
<br>

<h2 id="telegramsetup">Telegram Setup</h2>
<br>

In order to run your rapydbot instance you must first talk to the parent of all bots, [BotFather](https://telegram.me/BotFather). Tell him that you want to create  
a new bot, you can give it whatever name you want.

BotFather will respond to you with the access token necessary to use the Telegram Bot API, You can see an example below.

<a href="https://ibb.co/BzqQrVS"><img src="https://i.ibb.co/C1hYM5T/rpb.jpg" alt="BotCreation" border="0" height="650"></a>

You must save and keep your token safe. We will use it in the following steps so do not lose it or you will have to generate a new one.

<br>
<br>

<h2 id="rapydsetup">Rapyd Setup</h2>
<br>

Once you have your access token to the Telegram Bot API, it's time to request your access keys to the Rapyd API. To do this you must  
create an account in [Rapyd](https://www.rapyd.net/), once you have the account you will be able to get your access keys.

In your rapyd dashboard you can go to the developers section and there you can find your access keys. Don't forget to check the  
 box for sandbox mode.

<a href="https://ibb.co/ZVcNVnz"><img src="https://i.ibb.co/c12x1Gh/dashboard.png" alt="rapyddashboard" border="0"></a>

<a href="https://ibb.co/B38s7bn"><img src="https://i.ibb.co/QQsmqLD/keys.png" alt="dashboardkeys" border="0"></a>

Remember that these keys must remain private and secure. As with the token, save your keys and keep them close as we will  
 use them in the next step.

<br>
<br>

<h2 id="envvarssetup">Environment Variables Setup</h2>

Easy right? We are almost ready, it is time to prepare your environment.

The repository that you previously cloned should have a directory structure similar to this:

```file
├── bot
├── docs
├── user
├── wallet
├── .gitignore
├── LICENSE.md
├── package.json
└── README.md
```

Now we must create an `.env` file for each of the following directories:

```file
├── bot
├── user
└── wallet
```

It's in these files where you must add the token and access keys that we obtained previously.  
We have prepared a template for each `.env`:

```env
export NODE_ENV="test"

export IP_ADDRESS="localhost"
export SERVER_ENDPOINT="/"

export HTTP_PORT=YOUR_PORT_HERE
export HTTP_TEST_PORT=YOUR_PORT_HERE

export USER_SERVICE_URL="localhost:YOUR_PORT_HERE"
export WALLET_SERVICE_URL="localhost:YOUR_PORT_HERE"

export MYSQL_ROOT_USER="CHANGE_THIS"
export MYSQL_HOST="localhost"
export MYSQL_PORT=CHANGE_THIS
export MYSQL_ROOT_PASSWORD="CHANGE_THIS"
export MYSQL_USER="CHANGE_THIS"
export MYSQL_PASSWORD="CHANGE_THIS"
export MYSQL_DATABASE="MCS_DB_NAME"

export RAPYD_BASE_URL="https://sandboxapi.rapyd.net"
export RAPYD_SALT_LENGTH="8"

export BOT_TOKEN="YOUR TELEGRAM BOT TOKEN HERE"
export RAPYD_ACCESS_KEY="YOUR RAPYD ACCESS KEY HERE"
export RAPYD_SECRET_KEY="YOUR RAPYD SECRET KEY HERE"
```

<br>
<br>

### Take Into Consideration

The `HTTP_PORT` and `HTTP_TEST_PORT` environment variables are special and should change depending on the folder  
 you are in, additionally they should correspond to the `<MICROSERVICE_NAME>_SERVICE_URL` variable.

You can see an example for the user microservice below:

```env
export HTTP_PORT=4040
export HTTP_TEST_PORT=4041

export USER_SERVICE_URL="localhost:4040"
```

In the wallet microservice you would add this:

```env
export USER_SERVICE_URL="localhost:4040"
```

<br>
<br>

<h2 id="dbsetup">DB Setup</h2>
<br>

Time to prepare the DB, first you have to enter each of the following directories:

```file
├── user
└── wallet
```

Using your command line tool, access the following path:

```file
└── (wallet/user)
 └── src
   └── database
```

And run the following command:

```bash
  docker-compose up -d
```

If all goes well you should receive a successful log.

<br>
<br>

<h2 id="grpcsetup">Microservices Setup</h2>
<br>
We are so close 😃, Now with the DB ready we must prepare each one of the microservices. As in the previous step, we need to access

each of the directories and execute the `install.sh` script We can do this easily with the following commands:

```bash
  # USER MICROSERVICE
  cd user/ && source .env && sh install.sh

  # WALLET MICROSERVICE
  cd wallet/ && source .env && sh install.sh
```

This will expose the microservice as a node package.

`cd` into another microservice or the `bot` and run `yarn link @rapydbot/user`, for linking the @rapydbot/user mcs, for example.

Finally to start the gRPC server of the microservices run the command `yarn start` in the root of each microservice.

<br>
<br>

<h2 id="botrunning">Start Your RapydBot Instance</h2>
<br>

The moment of truth has arrived, now that both the DBs and the microservices are up and running it is time to start your  
instance of **@rapydbot** to do so, access the directory `bot` and enter the following command:

```bash
yarn start:debug
```

If everything goes as it should, you can now test your bot via Telegram, Fantastic! 😀😀😀

<br>
<br>
