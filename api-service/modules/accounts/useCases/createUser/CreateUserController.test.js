import { describe, jest, it, expect, beforeEach } from "@jest/globals";
import { CreateUserController } from "./CreateUserController";

describe("#CreateUserController", () => {
  const createUserUseCase = {
    execute: jest.fn(),
  };

  const user = {
    password: "123",
    email: "Jhon_Doe",
    isAdmin: false,
  };

  const request = {
    body: user,
  };

  const response = {
    status: () => response,
    send: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  it("should call execute and send on handler call", async () => {
    const createUserController = new CreateUserController({ createUserUseCase });

    await createUserController.handle(request, response);

    expect(response.send).toBeCalled();
    expect(createUserUseCase.execute).toBeCalled();
  });
});
