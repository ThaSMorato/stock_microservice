import { Mongo } from "../../../db/Mongo.js";
import { StockMongoRepository } from "./StockMongoRepository.js";

export class StockMongoRepositoryFactory {
  static #INSTANCE;
  static async createInstance() {
    if (!StockMongoRepositoryFactory.#INSTANCE) {
      const mongoClient = await Mongo.getInstance();
      const userMongoRepository = new StockMongoRepository({ db: mongoClient });
      StockMongoRepositoryFactory.#INSTANCE = userMongoRepository;
    }
    return StockMongoRepositoryFactory.#INSTANCE;
  }
}
