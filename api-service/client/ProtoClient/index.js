import grpc from "grpc";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ProtoClient {
  static #INSTANCE;

  constructor() {
    this.stockDefinition = grpc.load(path.resolve(__dirname, "./stock.proto"));
    this.stockClient = new this.stockDefinition.StockService(
      "localhost:50051",
      grpc.credentials.createInsecure()
    );
  }

  #promisefy(method) {
    return (params) => {
      return new Promise((resolve, rejects) => {
        this.stockClient[method](params, (err, response) => {
          if (err) return rejects(err);
          return resolve(response);
        });
      });
    };
  }

  static createInstance() {
    if (!ProtoClient.#INSTANCE) {
      ProtoClient.#INSTANCE = new ProtoClient();
    }

    return ProtoClient.#INSTANCE;
  }

  async find({ id }) {
    const stock = await this.#promisefy("find")({ id });
    return stock;
  }
}
