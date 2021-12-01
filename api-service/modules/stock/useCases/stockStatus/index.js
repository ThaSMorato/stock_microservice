import { StockMongoRepositoryFactory } from "../../repositories/StockMongoRepositoryFactory.js";
import { StockStatusController } from "./StockStatusController.js";
import { StockStatusUseCase } from "./StockStatusUseCase.js";

export class StockStatusFactory {
  static async createInstance() {
    const stockMongoRepository = await StockMongoRepositoryFactory.createInstance();
    const stockStatusUseCase = new StockStatusUseCase({
      stockMongoRepository,
    });
    const stockStatusController = new StockStatusController({ stockStatusUseCase });

    return stockStatusController;
  }
}
