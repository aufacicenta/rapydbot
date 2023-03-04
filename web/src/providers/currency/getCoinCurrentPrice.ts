export default async (id: string, vs: string) => {
  try {
    const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=${vs}`, {
      headers: {
        "content-type": "application/json",
      },
    });

    const content = await response.json();

    return content[id][vs];
  } catch {
    return "0.00";
  }
};
