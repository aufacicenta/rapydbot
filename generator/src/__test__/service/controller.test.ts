import {
  GetPriceReply,
  GetPriceRequest,
  Price_ClientGenerator,
} from "../../client";

describe("service:controller", () => {
  const client = new Price_ClientGenerator(
    `127.0.0.1:${process.env.HTTP_PORT}`
  ).create();

  const getPrice = (
    getPriceRequest: GetPriceRequest,
    from_currency: string
  ): Promise<GetPriceReply> =>
    new Promise((resolve, reject) => {
      client.getPrice(getPriceRequest, (err, response) => {
        if (err) {
          reject(err);
        }

        resolve(response);
      });
    });

  test("success:getPrice from currency", async () => {
    const getPriceRequest = new GetPriceRequest();

    const from_currency = "BTC";

    getPriceRequest.setFromCurrency(from_currency);

    const response = await getPrice(getPriceRequest, from_currency);

    const price_id = response.getPriceId();
    const price = response.getPrice();
    const to_currency = response.getToCurrency();

    expect(price_id).toBeTruthy();
    expect(price).toBeTruthy();
    expect(from_currency).toEqual(response.getFromCurrency());
  });

  test("error:getPrice from currency: btc", async () => {
    const getPriceRequest = new GetPriceRequest();

    const from_currency = "btc";

    getPriceRequest.setFromCurrency(from_currency);

    const response = await getPrice(getPriceRequest, from_currency);

    const price_id = response.getPriceId();
    const price = response.getPrice();
    const to_currency = response.getToCurrency();

    expect(price_id).toBeTruthy();
    expect(price).toBeTruthy();
    expect(from_currency).toEqual(response.getFromCurrency());
  });

  test("error:getPrice from currency", async () => {
    const getPriceRequest = new GetPriceRequest();

    const from_currency = "bitcoin";

    getPriceRequest.setFromCurrency(from_currency);

    await expect(getPrice(getPriceRequest, from_currency)).rejects.toThrow();
  });

  test("error:getPrice from invalid currency", async () => {
    const getPriceRequest = new GetPriceRequest();

    const from_currency = "invalid";

    getPriceRequest.setFromCurrency(from_currency);

    await expect(getPrice(getPriceRequest, from_currency)).rejects.toThrow();
  });
});
