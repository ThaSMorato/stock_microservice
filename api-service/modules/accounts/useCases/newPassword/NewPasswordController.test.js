import { describe, jest, it, expect, beforeEach } from "@jest/globals";
import { NewPasswordController } from "./NewPasswordController";

describe("#NewPasswordController", () => {
  const request = {
    user_id: "123",
    user_email: "user@example.com",
  };

  const user = {
    id: "123",
    email: "user@example.com",
    isAdmin: true,
  };

  const response = {
    status: () => response,
    send: jest.fn(),
  };

  const newPasswordUseCase = {
    execute: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  it("should call execute  and call send", async () => {
    newPasswordUseCase.execute.mockResolvedValue({ ...user, password: "123123" });
    const newPasswordController = new NewPasswordController({ newPasswordUseCase });

    await newPasswordController.handle(request, response);

    expect(response.send).toBeCalled();
    expect(newPasswordUseCase.execute).toBeCalledWith({
      email: request.user_email,
      user_id: request.user_id,
    });
  });
});
