const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const formatFiatCurrency = (amount: number) => formatter.format(amount);

export default formatFiatCurrency;
