import { Stock } from "../entities/Stock.js";

export class StockProtoRepository {
  #client;
  constructor({ client }) {
    this.#client = client;
  }

  async findById(id) {
    const stockData = await this.#client.find({ id });

    const stock = new Stock(stockData);

    if (stock.validate()) {
      return stock;
    }

    return null;
  }
}
