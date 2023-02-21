/* eslint-disable unused-imports/no-unused-vars */
import { Message } from "node-telegram-bot-api";
import { Attachment } from "stream-chat";

import { Bot } from "../Bot";
import { CustomMessage } from "../types";

import { IBotHandler } from "./types";

export class ContextHandler implements IBotHandler {
  private bot: Bot;

  constructor(bot: Bot) {
    this.bot = bot;
  }

  onText(_msg: CustomMessage) {
    return;
  }

  async sendMessage(msg: Message) {
    console.log("context.sendMessage", msg.text);

    return { id: "123" };

    // const { message } = await this.bot.context.channel.sendMessage({
    //   text: msg.text,
    //   user_id: msg.from.id.toString(),
    //   silent: true,
    //   skip_push: true,
    // });

    // return message;

    // @TODO handle error codes
  }

  async updateMessage(
    {
      text,
      from: { id: user_id },
      context: {
        chat: { message },
      },
    }: CustomMessage,
    attachments: Attachment[] = [],
  ) {
    console.log("context.updateMessage", text);

    // this.bot.context.chat.updateMessage({
    //   id: message.id,
    //   user_id: user_id.toString(),
    //   silent: true,
    //   text: message.text,
    //   html: message.html,
    //   attachments,
    // });

    // @TODO handle error codes
  }
}
