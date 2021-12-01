import { StockAxiosAPiStooq } from "../api/StockAxiosApiStooq.js";
import { ApiStockRepository } from "./ApiStockRepository.js";

export class ApiStockRepositoryFactory {
  static createInstance() {
    const stockAxiosAPiStooq = new StockAxiosAPiStooq();
    const apiStockRepository = new ApiStockRepository({ api: stockAxiosAPiStooq });
    return apiStockRepository;
  }
}
