import axios from "axios";
import grpc from "grpc";
import { injectable } from "inversify";
import "reflect-metadata";
import { IContext } from "../server/interface/IContext";
import { GetPriceReply, GetPriceRequest } from "../server/protos/schema_pb";
import { InvalidSymbolError } from "../service/error";

type GRPC<Request, Reply> = {
  call: grpc.ServerUnaryCall<Request>;
  callback: grpc.sendUnaryData<Reply>;
};

@injectable()
export class Controller {
  public static type: string = "Controller";

  async getPrice(
    { call, callback }: GRPC<GetPriceRequest, GetPriceReply>,
    { dao }: IContext
  ) {
    try {
      const from_currency = call.request.getFromCurrency().trim();
      const to_currency = call.request.getToCurrency().trim();

      const { price, convertToSymbol } = await this.getQuote({
        from_currency,
        to_currency,
      });

      const price_id = await dao.PriceDAO.createPrice(
        price,
        from_currency,
        convertToSymbol
      );

      const reply = new GetPriceReply();

      reply.setPriceId(price_id);
      reply.setPrice(price);
      reply.setFromCurrency(from_currency);
      reply.setToCurrency(convertToSymbol);

      callback(null, reply);
    } catch (error) {
      console.error(error);
      callback(error, null);
    }
  }

  private async getQuote({
    from_currency,
    to_currency,
  }: {
    from_currency: string;
    to_currency: string;
  }): Promise<{ price: number; convertToSymbol: string }> {
    try {
      const params = { symbol: from_currency };

      if (Boolean(to_currency)) {
        params["convert"] = to_currency;
      }

      const response = (
        await axios.get(
          `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`,
          {
            headers: {
              "X-CMC_PRO_API_KEY": "84a580d0-9e43-4fd4-8028-0dcc3960c49e",
            },
            params,
          }
        )
      ).data;

      const convertToSymbol = Boolean(to_currency) ? to_currency : "USD";

      const quote =
        response.data[from_currency.toUpperCase()].quote[convertToSymbol].price;

      return { price: quote.toFixed(2), convertToSymbol };
    } catch (error) {
      console.error(error);
      throw new InvalidSymbolError();
    }
  }
}
