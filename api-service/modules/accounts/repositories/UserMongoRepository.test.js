import { describe, jest, it, expect, beforeEach } from "@jest/globals";
import { ObjectId } from "bson";
import { User } from "../entities/User";
import { UserMongoRepository } from "./UserMongoRepository";

describe("#UserMongoRepository", () => {
  const db = {
    findOne: jest.fn(),
    insertOne: jest.fn(),
    updateOne: jest.fn(),
    collection: () => db,
  };

  const user = {
    password: "123",
    email: "Jhon_Doe",
    isAdmin: false,
  };

  const id = "012345678901234567890123";

  beforeEach(() => jest.clearAllMocks());

  it("should call insertOne on create", async () => {
    const userMongoRepository = new UserMongoRepository({ db });

    await userMongoRepository.create(user);

    expect(db.insertOne).toBeCalledWith(user);
  });

  it("should call findOne on findById", async () => {
    db.findOne.mockResolvedValue({ ...user, _id: id });

    const userMongoRepository = new UserMongoRepository({ db });

    const response = await userMongoRepository.findById(id);

    expect(db.findOne).toBeCalledWith({ _id: new ObjectId(id) });

    expect(response).toStrictEqual(new User({ ...user, _id: id }));
  });

  it("should call findOne on findByEmail", async () => {
    db.findOne.mockResolvedValue({ ...user, _id: "123" });

    const userMongoRepository = new UserMongoRepository({ db });

    const response = await userMongoRepository.findByEmail("Jhon_Doe");

    expect(db.findOne).toBeCalledWith({ email: "Jhon_Doe" });

    expect(response).toStrictEqual(new User({ ...user, _id: "123" }));
  });

  it("should return null if not found", async () => {
    db.findOne.mockResolvedValue(null);

    const userMongoRepository = new UserMongoRepository({ db });

    const responseFindById = await userMongoRepository.findById(id);

    const responseFindByEmail = await userMongoRepository.findByEmail("Jhon_Doe");

    expect(responseFindById).toBeNull();
    expect(responseFindByEmail).toBeNull();
  });

  it("should call updateOne on newPassword", async () => {
    const userMongoRepository = new UserMongoRepository({ db });
    const password = "456";

    await userMongoRepository.newPassword({ password, id });

    expect(db.updateOne).toBeCalledWith(
      { _id: new ObjectId(id) },
      {
        $set: {
          password,
        },
      }
    );
  });
});
