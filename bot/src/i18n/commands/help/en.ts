import { translationKeys } from "../../translationKeys";

export default {
  [translationKeys.command_text_help]: `
I can help you with the creation and management of your Rapyd E-Wallet.

You can control me by sending these commands:

<b><u>Wallet Actions</u></b>
<strong>/createwallet</strong> - create a new Rapyd e-wallet

<strong>/topup</strong> - create a new checkout page to top-up your e-wallet

<strong>/send</strong> - send funds to other users on telegram

<strong>/withdraw</strong> - withdraw cash from your wallet at Rapyd POS locations, such as ATMs and retail stores

<strong>/balance</strong> - get your e-wallet balance by your default currency

<b><u>Wallet Settings</u></b>
<strong>/setcountry</strong> - set your default country information
<strong>/setcurrency</strong> - set your default currency information

`,
  [translationKeys.help_command_buttons]: `
   [
     {"text":"/createwallet"},
     {"text":"/topup"},
     {"text":"/balance"},
     {"text":"/send"},
     {"text":"/withdraw"},
     {"text":"/setcountry"},
     {"text":"/setcurrency"}
  ]`,
};
