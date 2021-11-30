import { describe, jest, it, expect, beforeEach } from "@jest/globals";
import { hash } from "bcrypt";
import { ApiError } from "../../../../Error/ApiError";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

describe("#AuthenticateUserUseCase", () => {
  const userRepository = {
    findByLogin: jest.fn(),
  };

  const OLD_ENV = process.env;

  const user = {
    password: "123",
    login: "Jhon_Doe",
    name: "John",
    isAdmin: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...OLD_ENV };
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it("should throw an error if findByLogin returns null", async () => {
    // const hashPassword = await hash(user.password, 8);
    userRepository.findByLogin.mockResolvedValue(null);

    const authenticateUserUseCase = new AuthenticateUserUseCase({ userRepository });

    try {
      await authenticateUserUseCase.execute({ login: "user_login", password: "445566" });
    } catch (e) {
      expect(e).toStrictEqual(new ApiError("Login or password incorrect", 400));
    }
  });
  it("should throw an error if password is wrong", async () => {
    userRepository.findByLogin.mockResolvedValue(user);

    const authenticateUserUseCase = new AuthenticateUserUseCase({ userRepository });

    try {
      await authenticateUserUseCase.execute({ login: "user_login", password: "445566" });
    } catch (e) {
      expect(e).toStrictEqual(new ApiError("Login or password incorrect", 400));
    }
  });
  it("should return the user without the password and a token if the correct password and login is passed", async () => {
    process.env.JWT_KEY = "07ed6d3a2a485ede0afd99b17ebbb448";

    const password = await hash(user.password, 8);
    userRepository.findByLogin.mockResolvedValue({
      ...user,
      password,
      _id: {
        toString: () => "123456",
      },
    });

    const authenticateUserUseCase = new AuthenticateUserUseCase({ userRepository });

    const { user: user_response, token } = await authenticateUserUseCase.execute({
      login: "user_login",
      password: "123",
    });

    expect(user_response).toStrictEqual({
      _id: "123456",
      isAdmin: false,
      login: "Jhon_Doe",
      name: "John",
    });
    expect(typeof token).toBe("string");
  });
});
