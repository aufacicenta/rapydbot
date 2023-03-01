export default {
  isValidAmount(amount: any): boolean {
    return Boolean(amount) && amount.length > 0 && !Number.isNaN(Number(amount));
  },
  isValidCurrency(currency: any) {
    return Boolean(currency) && currency.length > 0;
  },
};
