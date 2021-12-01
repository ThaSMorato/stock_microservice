import { describe, it, jest, expect } from "@jest/globals";
import { ApiStockRepository } from "./ApiStockRepository";

describe("#Unit test ApiStockRepository", () => {
  it("should call the api get method", async () => {
    const mockedApiGet = jest.fn();

    const api = {
      get: mockedApiGet,
    };

    const id = "123";

    const apiStockRepository = new ApiStockRepository({ api });

    await apiStockRepository.getStockById(id);

    expect(mockedApiGet).toHaveBeenCalledWith({ id });
  });

  it("should return a json with the id as a key", async () => {
    const resolvedMockValue = [
      {
        key1: "Jhon",
        key2: "Doe",
      },
    ];

    const mockedApiGet = jest.fn().mockResolvedValue(resolvedMockValue);

    const api = {
      get: mockedApiGet,
    };

    const id = "123";

    const apiStockRepository = new ApiStockRepository({ api });

    const result = await apiStockRepository.getStockById(id);

    expect(result).toStrictEqual(resolvedMockValue[0]);
  });
});
