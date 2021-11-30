import { Mongo } from "../../../db/Mongo.js";
import { UserMongoRepository } from "./UserMongoRepository.js";

export class UserMongoRepositoryFactory {
  static #INSTANCE;
  static async createInstance() {
    if (!UserMongoRepositoryFactory.#INSTANCE) {
      const mongoClient = await Mongo.getInstance();
      const userMongoRepository = new UserMongoRepository({ db: mongoClient });
      UserMongoRepositoryFactory.#INSTANCE = userMongoRepository;
    }
    return UserMongoRepositoryFactory.#INSTANCE;
  }
}
