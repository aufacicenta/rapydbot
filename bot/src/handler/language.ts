import i18next, { TFunction } from "i18next";
import { Message } from "node-telegram-bot-api";
import { en, es, translationKeys } from "../i18n";

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

  getTranslation(msg: Message, translationKey: translationKeys, args: {} = {}) {
    const lng = msg?.from?.language_code || "en";
    return this.languageProcessor(translationKey.toString(), {
      lng,
      ...args,
    });
  }
}
