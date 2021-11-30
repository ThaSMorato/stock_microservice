import { describe, jest, it, expect, beforeEach } from "@jest/globals";
import { AuthenticateUserController } from "./AuthenticateController";

describe("#AuthenticateUserController", () => {
  const authenticateUserUseCase = {
    execute: jest.fn(),
  };

  const user = {
    password: "123",
    login: "Jhon_Doe",
    name: "John",
    isAdmin: false,
  };

  const request = {
    body: user,
  };

  const response = {
    status: () => response,
    json: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  it("should call execute and json on handler call", async () => {
    const requestResponse = { user, token: "123" };

    authenticateUserUseCase.execute.mockResolvedValue(requestResponse);

    const authenticateController = new AuthenticateUserController({ authenticateUserUseCase });

    await authenticateController.handle(request, response);

    expect(response.json).toBeCalledWith(requestResponse);
    expect(authenticateUserUseCase.execute).toBeCalledWith({
      login: user.login,
      password: user.password,
    });
  });
});
