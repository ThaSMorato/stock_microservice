import { StockProtoRepositoryFactory } from "../../repositories/StockProtoRepositoryFactory.js";
import { FindStockByIdController } from "./FindStockByIdController.js";
import { FindStockByIdUseCase } from "./FindStockByIdUseCase.js";

export class FindStockByIdFactory {
  static createInstance() {
    const stockProtoRepository = StockProtoRepositoryFactory.createInstance();
    const findStockByIdUseCase = new FindStockByIdUseCase({
      stockProtoRepository,
    });
    const findStockByIdController = new FindStockByIdController({ findStockByIdUseCase });

    return findStockByIdController;
  }
}
