import { ObjectId } from "bson";
import { User } from "../entities/User.js";

export class UserMongoRepository {
  #db;

  constructor({ db }) {
    this.#db = db;
  }

  async create({ password, login, name, isAdmin = false }) {
    await this.#db.collection("user").insertOne({
      password,
      login,
      name,
      isAdmin,
    });
  }

  async findById(id) {
    const userData = await this.#db.collection("user").findOne({
      _id: new ObjectId(id),
    });

    if (userData) {
      return new User(userData);
    }

    return null;
  }

  async findByLogin(login) {
    const userData = await this.#db.collection("user").findOne({
      login,
    });

    if (userData) {
      return new User(userData);
    }

    return null;
  }

  async newPassword({ password, id }) {
    await this.#db.collection("user").updateOne(
      {
        _id: new ObjectId(id),
      },
      {
        $set: {
          password,
        },
      }
    );
  }
}
