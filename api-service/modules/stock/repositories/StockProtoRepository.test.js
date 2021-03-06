import { describe, jest, it, expect, beforeEach } from "@jest/globals";
import { Stock } from "../entities/Stock";
import { StockProtoRepository } from "./StockProtoRepository";

const result = {
  Symbol: "1234",
  Date: "1234",
  Time: "1234",
  Open: "1234",
  High: "1234",
  Low: "1234",
  Close: "1234",
  Volume: "1234",
  Name: "1234",
};

describe("#StockProtoRepository", () => {
  const client = {
    find: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  it("should call client.find with the given id", async () => {
    const expected = "123123";

    client.find.mockResolvedValue(result);
    const stockProtoRepository = new StockProtoRepository({ client });
    await stockProtoRepository.findById(expected);

    expect(client.find).toBeCalledWith({ id: expected });
  });

  it("should return a Stock if client.find return a stock", async () => {
    client.find.mockResolvedValue(result);

    const stockProtoRepository = new StockProtoRepository({ client });
    const stock = await stockProtoRepository.findById("123");

    const expected = new Stock(result);

    expect(stock).toStrictEqual(expected);
  });

  it("should return null if the result from client.find is a invalid result", async () => {
    const invalid_result = {
      Symbol: "1234",
      Date: "N/D",
      Time: "N/D",
      Open: "N/D",
      High: "N/D",
      Low: "N/D",
      Close: "N/D",
      Volume: "N/D",
      Name: "1234",
    };

    client.find.mockResolvedValue(invalid_result);

    const stockProtoRepository = new StockProtoRepository({ client });
    const stock = await stockProtoRepository.findById("123");

    expect(stock).toBeNull();
  });
});
