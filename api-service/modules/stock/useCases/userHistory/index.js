import { StockMongoRepositoryFactory } from "../../repositories/StockMongoRepositoryFactory.js";
import { UserHistoryController } from "./UserHistoryController.js";
import { UserHistoryUseCase } from "./UserHistoryUseCase.js";

export class UserHistoryFactory {
  static async createInstance() {
    const stockMongoRepository = await StockMongoRepositoryFactory.createInstance();
    const userHistoryUseCase = new UserHistoryUseCase({
      stockMongoRepository,
    });
    const userHistoryController = new UserHistoryController({ userHistoryUseCase });

    return userHistoryController;
  }
}
