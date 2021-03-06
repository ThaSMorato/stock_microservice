import { describe, jest, it, expect, beforeEach } from "@jest/globals";
import { CreateUserController } from "./CreateUserController";

describe("#CreateUserController", () => {
  const createUserUseCase = {
    execute: jest.fn(),
  };

  const user = {
    email: "Jhon_Doe",
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
    createUserUseCase.execute.mockResolvedValue({ ...user, password: "123123" });
    const createUserController = new CreateUserController({ createUserUseCase });

    await createUserController.handle(request, response);

    expect(response.json).toBeCalled();
    expect(createUserUseCase.execute).toBeCalled();
  });
});
