import { describe, jest, it, expect, beforeEach } from "@jest/globals";
import { ApiError } from "../../../../Error/ApiError";
import { FindStockByIdController } from "./FindStockByIdController";

describe("#FindStockByIdController", () => {
  const findStockByIdUseCase = {
    execute: jest.fn(),
  };

  let request = {};

  const response = {
    status: () => response,
    json: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    request = {
      query: {
        q: null,
      },
    };
  });

  it("should give an error if query is not given", async () => {
    const findStockByIdController = new FindStockByIdController({ findStockByIdUseCase });

    try {
      await findStockByIdController.handle(request, response);
    } catch (e) {
      expect(e).toStrictEqual(new ApiError("Query must be provided", 400));
    }
  });

  it("should give an error if stock is not found", async () => {
    request = {
      query: {
        q: "123",
      },
    };

    findStockByIdUseCase.execute.mockResolvedValue(null);

    const findStockByIdController = new FindStockByIdController({ findStockByIdUseCase });

    try {
      await findStockByIdController.handle(request, response);
    } catch (e) {
      expect(e).toStrictEqual(new ApiError("Stock not found", 400));
    }
  });

  it("should return a stock if found", async () => {
    request = {
      query: {
        q: "123",
      },
    };

    const expected = {
      id: "123",
      name: "test",
    };

    findStockByIdUseCase.execute.mockResolvedValue(expected);

    const findStockByIdController = new FindStockByIdController({ findStockByIdUseCase });

    await findStockByIdController.handle(request, response);

    expect(response.json).toBeCalledWith(expected);
  });
});
