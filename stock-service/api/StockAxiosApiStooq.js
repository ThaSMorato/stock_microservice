import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import csv from "csv-parser";

const token = process.env.STOOQ_TOKEN;

const type = "csv";

const header = true;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class StockAxiosAPiStooq {
  #instance;

  static _temp_path = path.join(__dirname, "..", "/tmp");

  constructor() {
    this.#instance = axios.create({
      baseURL: "https://stooq.com/q/l",
    });
  }

  async _handleCSVFile(data, id) {
    return new Promise((resolve, reject) => {
      const results = [];
      const file = path.join(StockAxiosAPiStooq._temp_path, `${id}.csv`);
      fs.writeFileSync(file, data);
      fs.createReadStream(file)
        .pipe(csv())
        .on("data", (data) => results.push(data))
        .on("end", () => {
          fs.promises.unlink(file);
          resolve(results);
        })
        .on("error", (err) => reject(err));
    });
  }

  async get({ id }) {
    const { data } = await this.#instance.get(`/`, {
      params: {
        s: id,
        f: token,
        e: type,
        h: header,
      },
    });

    const result = await this._handleCSVFile(data, id);

    return result;
  }
}

export { StockAxiosAPiStooq };
