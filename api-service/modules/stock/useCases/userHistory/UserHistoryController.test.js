import { describe, jest, it, expect, beforeEach } from "@jest/globals";
import { UserHistoryController } from "./UserHistoryController";

describe("#UserHistoryController", () => {
  const userHistoryUseCase = {
    execute: jest.fn(),
  };

  const response = {
    status: jest.fn(),
    json: jest.fn(),
  };

  const request = {
    user_id: "123",
  };

  beforeEach(() => jest.clearAllMocks());

  it("should call execute on execute", async () => {
    const expected = "resolved value";

    userHistoryUseCase.execute.mockResolvedValue(expected);
    response.status.mockReturnValue(response);

    const userHistoryController = new UserHistoryController({ userHistoryUseCase });

    await userHistoryController.handle(request, response);

    expect(userHistoryUseCase.execute).toBeCalledWith(request.user_id);
    expect(response.status).toBeCalledWith(200);
    expect(response.json).toBeCalledWith(expected);
  });
});
