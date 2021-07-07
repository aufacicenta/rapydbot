# RapydBot

RapydBot is a Conversational User Experience designed for Telegram Messenger applications.
<br>
<br>

## Summary

<hr>
<br>

Using the Telegram Bot API, **RapydBot** implements some of the Rapyd API’s features to allow any Telegram user to create a  
Rapyd e-wallet, top up its balance using their card, cash payment or a bank transfer, and use that money in a variety of ways  
to create innovative **chat economies**, all within the Telegram interface.
<br>
<br>

## Current Features

<hr>
<br>

**@rapydbot** is the official name of the Telegram Bot. Any Telegram user can search for this bot and start a conversation with it.

Like most of the bots in telegram, **@rapydbot** facilitates the use of its features through commands. In the following list you can  
see the commands you can call.
<br>
<br>

### Principal Commands

<hr>
<br>

| Command         | Description                                                                                                                                                                                                                                                    |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/start`        | Responds with initial instructions to create a Rapyd e-wallet.                                                                                                                                                                                                 |
| `/createwallet` | Responds with a Rapyd e-wallet address and its Telegram username reference. The Rapyd e-wallet has been set to use the country and currency chosen with `/setcountry` and `/setcurrency`.                                                                      |
| `/setcountry`   | Responds with a list of available countries and currencies to set the Rapyd e-wallet default country. By default this command sets the currency corresponding to the selected country the currency can be changed at any time with the command `/setcurrency`. |
| `/setcurrency`  | Responds with a list of available currencies to set the Rapyd e-wallet default currency.                                                                                                                                                                       |
| `/topup`        | Responds with an Inline Keyboard reply that redirects the user to a Rapyd checkout page set with the chosen Country and Currency options.                                                                                                                      |
| `/balance`      | Responds with a balance summary of the user’s Rapyd e-wallet according to its default Currency. If the user does not have a balance for the set currency, the first balance with a set currency is returned.                                                   |
| `/transfer`     | Responds with a confirmation message to transfer an amount from the user’s Rapyd e-wallet to another Telegram user Rapyd e-wallet. If the recipient user does not have a Rapyd e-wallet yet, the command will notify the sender.                               |
| `/help`         | Respond with a detailed list of available commands.                                                                                                                                                                                                            |

<br>
<br>

### Future Commands

<hr>
<br>

These are just some of the up coming commands that **@rapydbot** will implement.

| Command          | Description                                                                                                                                                                                          |
| :--------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/withdraw`      | Responds with an Inline Keyboard that redirects the user to a secure form to input the user’s withdrawal options, such as Bank Transfer, PayPal, etc...                                              |
| `/createescrow`  | Creates a Rapyd escrow that will allow Telegram users to transfer money from their Rapyd e-wallet balance to it. The given name will be an escrow identifier that users can use to send money to it. |
| `/escrow`        | Requests the amount to transfer from the user’s Rapyd e-wallet and notifies the user upon a successful transaction.                                                                                  |
| `/escrowbalance` | Responds with a Rapyd escrow balance if it exists.                                                                                                                                                   |

<br>
<br>

## Behind The Scenes ⚙️

<hr>

Rapydbot was built using microservices, Node JS, Typescript, The **Rapyd API** and lots of love 💖. If you want to know more about the **@rapydbot**'s architecture choose one of the following documents:

### **_[RapydBot Up and Running](/doc/UpAndRunning.md)_** :

Everything you need to know about how to put **@rapydbot** in motion. Includes a detailed guide with which you can create your own **@rapydbot** in a local environment.
<br>

### **_[Inside RapydBot](/doc/InsideRapydBot.md)_** :

A detailed explanation of the internal components, technologies used and general architecture of **@rapydbot**\.
<br>

### **_RapydBot Infra_**:

**_[This repo](https://github.com/aufacicenta/rapydbot-infra)_** contains everything you need to know about the infrastructure used by **@rapydbot**\.
<br>
<br>

<br>

## Contributors ✨

<hr>
<br>
<table >
  <tr>
    <td align="center">
     <a href="https://github.com/netpoe">
     <img src="https://avatars.githubusercontent.com/u/4053518?v=4" width="100px;" alt=""/>
     <br />
     <sub><b>Netpoe</b></sub>
     </a><br /> 
     <a  href="#" title="Code">💻</a>
     <a  href="#" title="Reviewed  Pull Requests">👀<a> 
     <a href="#"  title="Documentation">📖</a>
     <a href="#" title="Tools">🔧</a> 
     <a href="#" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a>
    </td>
    <td align="center">
     <a href="https://github.com/Ktoxcon">
     <img src="https://avatars.githubusercontent.com/u/60626791?v=4" width="100px;" alt=""/>
     <br />
     <sub><b>Ktoxcon</b></sub>
     </a><br /> 
     <a href="#" title="Code">💻</a>
     <a href="#" title="Reviewed  Pull Requests">👀<a> 
     <a href="#"  title="Documentation">📖</a>
    </td>
     <td align="center">
     <a href="https://github.com/susguzman">
     <img src="https://avatars.githubusercontent.com/u/7908092?v=4" width="100px;" alt=""/>
     <br />
     <sub><b>Susguzman</b></sub>
     </a><br /> 
     <a href="#" title="Code">💻</a>
     <a href="#" title="Reviewed  Pull Requests">👀<a> 
     <a href="#"  title="Documentation">📖</a>
     <a href="#" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a>
    </td>
    </td>  
  </tr>
</table>
