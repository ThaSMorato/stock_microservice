import { Stock } from "../entities/Stock.js";

export class StockProtoRepository {
  #client;
  constructor({ client }) {
    this.#client = client;
  }

  async findById(id) {
    const stock = await this.#client.find({ id });

    if (stock) {
      return new Stock(stock);
    }

    return null;
  }
}
