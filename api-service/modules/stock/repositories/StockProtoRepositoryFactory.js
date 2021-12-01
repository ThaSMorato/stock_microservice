import { ProtoClient } from "../../../client/ProtoClient/index.js";
import { StockProtoRepository } from "./StockProtoRepository.js";

export class StockProtoRepositoryFactory {
  static #INSTANCE;
  static createInstance() {
    if (!StockProtoRepositoryFactory.#INSTANCE) {
      const protoClient = ProtoClient.createInstance();
      const stockProtoRepository = new StockProtoRepository({ client: protoClient });
      StockProtoRepositoryFactory.#INSTANCE = stockProtoRepository;
    }
    return StockProtoRepositoryFactory.#INSTANCE;
  }
}
