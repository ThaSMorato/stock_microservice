import { describe, jest, it, expect, beforeEach } from "@jest/globals";
import { Stock } from "../entities/Stock";
import { StocksCountDTO } from "../entities/StocksCountDTO";
import { StockMongoRepository } from "./StockMongoRepository";

describe("#StockMongoRepository", () => {
  const db = {
    collection: () => db,
    insertOne: jest.fn(),
    find: jest.fn(),
    aggregate: jest.fn(),
  };

  const stock = {
    Symbol: "123",
    Date: "123",
    Time: "123",
    Open: "123",
    High: "123",
    Low: "123",
    Close: "123",
    Volume: "123",
    Name: "123",
  };

  const countArray = [
    { _id: "123", total: 2 },
    { _id: "456", total: 6 },
  ];

  const user_id = "123";

  beforeEach(() => jest.clearAllMocks());

  it("should call insertOne with the stock and the user_id on create", async () => {
    const stockMongoRepository = new StockMongoRepository({ db });

    await stockMongoRepository.create(stock, user_id);

    expect(db.insertOne).toBeCalledWith({
      ...stock,
      user_id,
    });
  });

  it("should call find with the user_id on findByUserId and return an Array with DTO", async () => {
    const toArrayMock = jest.fn().mockResolvedValue([stock]);

    db.find.mockResolvedValue({
      toArray: toArrayMock,
    });

    const stockMongoRepository = new StockMongoRepository({ db });

    const result = await stockMongoRepository.findByUserId(user_id);

    expect(db.find).toBeCalledWith({ user_id });
    expect(result).toStrictEqual([new Stock(stock)]);
  });

  it("should call aggregate on getCount and return an Array with DTO", async () => {
    const toArrayMock = jest.fn().mockResolvedValue(countArray);

    db.aggregate.mockResolvedValue({
      toArray: toArrayMock,
    });

    const stockMongoRepository = new StockMongoRepository({ db });

    const result = await stockMongoRepository.getCount();

    const expected = countArray.map((countObj) => new StocksCountDTO(countObj));

    expect(db.aggregate).toBeCalled();
    expect(result).toStrictEqual(expected);
  });
});
