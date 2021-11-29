import { describe, jest, it, expect, beforeEach } from "@jest/globals";
import { ApiError } from "../../../../Error/ApiError";
import { CreateUserUseCase } from "./CreateUserUseCase";

describe("#CreateUserUseCase", () => {
  const userRepository = {
    findByLogin: jest.fn(),
    create: jest.fn(),
  };

  const user = {
    password: "123",
    login: "Jhon_Doe",
    name: "John",
    isAdmin: false,
  };

  beforeEach(() => jest.clearAllMocks());

  it("should call findByLogin on execute", async () => {
    const createUserUseCase = new CreateUserUseCase({ userRepository });
    await createUserUseCase.execute(user);
    expect(userRepository.findByLogin).toBeCalledWith(user.login);
  });

  it("should call create if findByLogin returns null", async () => {
    userRepository.findByLogin.mockResolvedValue(null);
    const createUserUseCase = new CreateUserUseCase({ userRepository });
    await createUserUseCase.execute(user);

    expect(userRepository.create).toBeCalledWith(user);
  });

  it("should throw an ApiError if findByLogin returns a user", async () => {
    userRepository.findByLogin.mockResolvedValue(user);
    const createUserUseCase = new CreateUserUseCase({ userRepository });

    try {
      await createUserUseCase.execute(user);
    } catch (e) {
      expect(e).toStrictEqual(new ApiError("Login already in use", 400));
    }
  });
});
