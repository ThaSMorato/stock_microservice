import { Stock } from "../entities/Stock.js";
import { StocksCountDTO } from "../entities/StocksCountDTO.js";

export class StockMongoRepository {
  #db;

  constructor({ db }) {
    this.#db = db;
  }

  async create(stock, user_id) {
    await this.#db.collection("stock_history").insertOne({
      ...stock,
      user_id,
    });
  }

  async findByUserId(id) {
    const stocks = await (
      await this.#db.collection("stock_history").find({
        user_id: id,
      })
    ).toArray();

    return stocks.map((stock) => new Stock(stock));
  }

  async getCount() {
    const countStocks = await (
      await this.#db
        .collection("stock_history")
        .aggregate([{ $group: { _id: "$Symbol", total: { $sum: 1 } } }])
    ).toArray();

    return countStocks.map((countStock) => new StocksCountDTO(countStock));
  }
}
