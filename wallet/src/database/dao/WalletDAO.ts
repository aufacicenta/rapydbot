import { ModelCtor, Sequelize } from "sequelize";
import { CreateWalletResponse } from "../../server/protos/schema_pb";
import { WalletModel } from "../model";

export class WalletDAO {
  private driver: Sequelize;
  private wallet: ModelCtor<WalletModel>;

  constructor(driver: Sequelize) {
    this.driver = driver;
    this.wallet = driver.model(WalletModel.tableName);
  }

  async createWallet({
    telegram_from_user_id,
    rapyd_e_wallet,
    rapyd_e_wallet_reference,
    wallet_type,
  }: {
    telegram_from_user_id: string;
    rapyd_e_wallet: string;
    rapyd_e_wallet_reference: string;
    wallet_type: string;
  }): Promise<CreateWalletResponse.AsObject> {
    /**
     * TODO
     * - Call Rapyd API using the Rapyd Client
     * - Call the User MCS to get the userId
     */

    const walletId = "";
    const user_id = "";

    return {
      userId: user_id,
      walletId,
    };
  }
}
