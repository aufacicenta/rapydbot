export default {
  isValidAmount(amount: any): boolean {
    return Boolean(amount) || amount.length > 0 || !isNaN(Number(amount));
  },
  isValidCurrency(currency: any) {
    return Boolean(currency) || currency.length > 0;
  },
};
