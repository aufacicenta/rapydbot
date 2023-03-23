export default {
  getAmountAndCurrency(text: string): RegExpExecArray {
    return /(?<amount>\d+\.?\d*|\.\d+$)(?<currency>\b.*\b)/i.exec(text);
  },
  getAmountOrCurrency(text: string): RegExpExecArray {
    return /(?<amount>\d+\.?\d*|\.\d+$)|(?<currency>[/a-z]+)/i.exec(text);
  },
  getAmount(text: string): RegExpExecArray {
    return /(?<amount>\d+\.?\d*|\.\d+$)/i.exec(text);
  },
  isCurrencyPair(text: string): boolean {
    return /\//i.test(text);
  },
  getCurrencyPair(text: string): RegExpExecArray {
    return /(?<from_currency>[a-z]+)\/?(?<to_currency>[a-z]+)?/i.exec(text);
  },
};
