import { describe, jest, it, expect, beforeEach } from "@jest/globals";
import { StockStatusController } from "./StockStatusController";

describe("#StockStatusController", () => {
  const stockStatusUseCase = {
    execute: jest.fn(),
  };

  const response = {
    status: jest.fn(),
    json: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  it("should call execute on execute", async () => {
    const expected = "resolved value";

    stockStatusUseCase.execute.mockResolvedValue(expected);
    response.status.mockReturnValue(response);

    const stockStatusController = new StockStatusController({ stockStatusUseCase });

    await stockStatusController.handle(null, response);

    expect(stockStatusUseCase.execute).toBeCalled();
    expect(response.status).toBeCalledWith(200);
    expect(response.json).toBeCalledWith(expected);
  });
});
