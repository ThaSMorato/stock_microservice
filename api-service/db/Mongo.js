import { MongoClient } from "../client/MongoClient.js";

export class Mongo {
  static #INSTANCE;
  #db;

  static async getInstance() {
    if (!Mongo.#INSTANCE) {
      Mongo.#INSTANCE = new Mongo();
      Mongo.#INSTANCE.#db = await MongoClient.getInstance().connect();
    }

    return Mongo.#INSTANCE.#db;
  }
}
