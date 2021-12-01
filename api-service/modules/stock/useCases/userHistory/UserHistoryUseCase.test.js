import { describe, jest, it, expect, beforeEach } from "@jest/globals";
import { UserHistoryUseCase } from "./UserHistoryUseCase";

describe("#UserHistoryUseCase", () => {
  const stockMongoRepository = {
    findByUserId: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  it("should call getCount on execute", async () => {
    const expected = "resolved value";
    const user_id = "123";
    stockMongoRepository.findByUserId.mockResolvedValue(expected);

    const userHistoryUseCase = new UserHistoryUseCase({ stockMongoRepository });

    const result = await userHistoryUseCase.execute(user_id);

    expect(result).toBe(expected);
    expect(stockMongoRepository.findByUserId).toBeCalledWith(user_id);
  });
});
