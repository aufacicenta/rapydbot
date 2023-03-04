export default async () => {
  const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd`, {
    headers: {
      "content-type": "application/json",
    },
  });

  const content = await response.json();

  return content.bitcoin.usd;
};
