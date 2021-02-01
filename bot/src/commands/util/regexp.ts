export default {
  getAmountAndCurrency(text: string): RegExpExecArray {
    return /(?<amount>\d+\.?\d*|\.\d+$)(?<currency>\b.*\b)/i.exec(text);
  },
  isCurrencyPair(text: string): boolean {
    return /\/{1}/i.test(text);
  },
  getCurrencyPair(text: string): RegExpExecArray {
    return /(?<from_currency>\w+)\/(?<to_currency>\w+)/i.exec(text);
  },
};
