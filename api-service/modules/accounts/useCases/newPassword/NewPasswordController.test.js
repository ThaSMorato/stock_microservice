import { describe, jest, it, expect, beforeEach } from "@jest/globals";
import { NewPasswordController } from "./NewPasswordController";

describe("#NewPasswordController", () => {
  const request = {
    user_id: "123",
  };

  const response = {
    status: () => response,
    send: jest.fn(),
  };

  const newPasswordUseCase = {
    execute: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  it("should call execute with a new hashed password and the user id from request and call send", async () => {
    const newPasswordController = new NewPasswordController({ newPasswordUseCase });

    await newPasswordController.handle(request, response);

    expect(response.send).toBeCalled();
    expect(newPasswordUseCase.execute).toBeCalled();
  });
});
