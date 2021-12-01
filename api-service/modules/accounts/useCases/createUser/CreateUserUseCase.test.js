import { describe, jest, it, expect, beforeEach } from "@jest/globals";
import { ApiError } from "../../../../Error/ApiError";
import { CreateUserUseCase } from "./CreateUserUseCase";

describe("#CreateUserUseCase", () => {
  const userRepository = {
    findByEmail: jest.fn(),
    create: jest.fn(),
  };

  const user = {
    password: "123",
    email: "Jhon_Doe",
    isAdmin: false,
  };

  beforeEach(() => jest.clearAllMocks());

  it("should call findByEmail on execute", async () => {
    const createUserUseCase = new CreateUserUseCase({ userRepository });
    await createUserUseCase.execute(user);
    expect(userRepository.findByEmail).toBeCalledWith(user.email);
  });

  it("should call create if findByEmail returns null", async () => {
    userRepository.findByEmail.mockResolvedValue(null);
    const createUserUseCase = new CreateUserUseCase({ userRepository });
    await createUserUseCase.execute(user);

    expect(userRepository.create).toBeCalledWith(user);
  });

  it("should throw an ApiError if findByEmail returns a user", async () => {
    userRepository.findByEmail.mockResolvedValue(user);
    const createUserUseCase = new CreateUserUseCase({ userRepository });

    try {
      await createUserUseCase.execute(user);
    } catch (e) {
      expect(e).toStrictEqual(new ApiError("Email already in use", 400));
    }
  });
});
