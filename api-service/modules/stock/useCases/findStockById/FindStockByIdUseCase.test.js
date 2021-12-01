import { describe, jest, it, expect, beforeEach } from "@jest/globals";
import { FindStockByIdUseCase } from "./FindStockByIdUseCase";

describe("#FindStockByIdUseCase", () => {
  const stockProtoRepository = {
    findById: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  it("should call findById with the given id on execute", async () => {
    const expected = "123";

    const findStockByIdUseCase = new FindStockByIdUseCase({ stockProtoRepository });
    await findStockByIdUseCase.execute({ id: expected });

    expect(stockProtoRepository.findById).toBeCalledWith(expected);
  });
});
