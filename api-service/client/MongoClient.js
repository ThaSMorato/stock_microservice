import { MongoClient as Mongo } from "mongodb";

export class MongoClient {
  #client;
  movie_db = process.env.MONGODB_DATABASE;
  static #INSTANCE;

  constructor() {
    this.#client = new Mongo(
      `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`
    );
  }

  static getInstance() {
    if (!MongoClient.#INSTANCE) {
      MongoClient.#INSTANCE = new MongoClient();
    }

    return MongoClient.#INSTANCE;
  }

  async connect() {
    await this.#client.connect();
    const db = this.#client.db(this.movie_db);
    return db;
  }
}
