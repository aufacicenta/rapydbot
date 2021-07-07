# RapydBot - Up and Running

Here you will find everything you need to know to be able to run and test **@rapydbot** in your own local environment.
<br>

## Prerequisites

<hr>
Before you begin, check that you have the following programs installed on your computer:  
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

<hr>

Follow the below steps to have your own **@rapydbot** instance ready for testing:

1. <a href="#reposetup">Clone or Download The RapydBot Repository</a>
2. <a href="#telegramsetup">Request your access keys to the Telegram Bot API</a>
3. <a href="#rapydsetup">Request your access keys to the Rapyd API</a>
4. <a href="#envvarssetup">Prepare your environment variables</a>
5. <a href="#dbsetup">DB Setup</a>
6. <a href="#grpcsetup">Microservices Setup</a>
7. <a href="#mscsrunning">Start the Microservices</a>

Optional Configuration:  
This steps are optional but if you want to use all the features it's recommended that you follow them.

- <a href="#rapydhooksetup">Setting Up the Top-up Webhook</a>
- <a href="#rapydhooksetup">Setting Up the Transfer Webhook</a>
