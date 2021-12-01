import { describe, jest, it, expect, beforeEach } from "@jest/globals";
import { StockStatusUseCase } from "./StockStatusUseCase";

describe("#StockStatusUseCase", () => {
  const stockMongoRepository = {
    getCount: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  it("should call getCount on execute", async () => {
    const expected = "resolved value";
    stockMongoRepository.getCount.mockResolvedValue(expected);

    const stockStatusUseCase = new StockStatusUseCase({ stockMongoRepository });

    const result = await stockStatusUseCase.execute();

    expect(result).toBe(expected);
    expect(stockMongoRepository.getCount).toBeCalled();
  });
});
