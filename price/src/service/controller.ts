import axios from "axios";
import grpc from "grpc";
import { injectable } from "inversify";
import "reflect-metadata";
import { IContext } from "../server/interface/IContext";
import { GetPriceReply, GetPriceRequest } from "../server/protos/schema_pb";
import { Price_ServiceErrorCodes } from "../service/error";

type GRPC<Request, Reply> = {
  call: grpc.ServerUnaryCall<Request>;
  callback: grpc.sendUnaryData<Reply>;
};

const priceFormatter = Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
});

@injectable()
export class Controller {
  public static type: string = "Controller";

  async getPrice({ call, callback }: GRPC<GetPriceRequest, GetPriceReply>, { dao }: IContext) {
    try {
      const from_currency = call.request.getFromCurrency().trim();
      const to_currency = call.request.getToCurrency().trim();

      const { price, convertToSymbol } = await this.getQuote({
        from_currency,
        to_currency,
      });

      const price_id = await dao.PriceDAO.createPrice(price, from_currency, convertToSymbol);

      const reply = new GetPriceReply();

      reply.setPriceId(price_id);
      reply.setPrice(priceFormatter.format(price));
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
        await axios.get(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest`, {
          headers: {
            "X-CMC_PRO_API_KEY": "84a580d0-9e43-4fd4-8028-0dcc3960c49e",
          },
          params,
        })
      ).data;

      const convertToSymbol = Boolean(to_currency) ? to_currency.toUpperCase() : "USD";

      const quote = response.data[from_currency.toUpperCase()].quote[convertToSymbol].price;

      return { price: quote, convertToSymbol };
    } catch (error) {
      console.error(error);
      throw new Error(Price_ServiceErrorCodes.invalid_symbol);
    }
  }
}
