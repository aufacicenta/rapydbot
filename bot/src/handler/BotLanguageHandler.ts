import i18next, { TFunction } from "i18next";
import { Message } from "node-telegram-bot-api";
import { en, es } from "../i18n";

export class BotLanguageHandler {
  private languageProcessor: TFunction;

  async init() {
    this.languageProcessor = await i18next.init({
      lng: "en",
      debug: true,
      resources: {
        es,
        en,
      },
    });
  }

  getTranslation(msg: Message, translationKey: string, args: {} = {}) {
    const lng = msg.from.language_code;
    return this.languageProcessor(translationKey, {
      lng,
      ...args,
    });
  }
}
