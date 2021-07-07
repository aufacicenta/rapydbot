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
- [Yarn](https://yarnpkg.com/) or [Npm](https://www.npmjs.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop)
- A command line tool like Bash or Powershell

Make sure to follow the instructions provided for the installation of the above programs based on your operating system.  
In this guide we will use **Yarn** but feel free to use your favorite Node package manager.

Additionally we assume that you have knowledge or previous experience using the following tools and technologies:

- Git
- Bash or Powershell
- Docker CLI
- Docker Compose
- Yarn or Npm

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
7. <a href="#mscsrunning">Start the Microservices</a>

### Optional Configuration:

This steps are optional but if you want to use all the features it's recommended that you follow them.

- <a href="#rapydhooksetup">Setting Up the Top-up Webhook</a>
- <a href="#rapydhooksetup">Setting Up the Transfer Webhook</a>
  <br>
  <br>

## Troubleshooting

Problems with your **@rapydbot** instance?  
We got you covered, Visit the following [document]() which describes some of the most common boot/installation problems.

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

<h2 id="rapydsetup">Env Variables Setup</h2>

Easy right? We are almost ready, it is time to prepare your environment.

<br>
<br>
