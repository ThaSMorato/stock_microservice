import { describe, jest, it, expect, beforeEach } from "@jest/globals";
import { NewPasswordUseCase } from "./NewPasswordUseCase";

describe("#NewPasswordUseCase", () => {
  const userRepository = {
    findByEmail: jest.fn(),
    newPassword: jest.fn(),
  };

  const user = {
    email: "example@gmail.com",
    isAdmin: true,
    id: "123",
  };

  beforeEach(() => jest.clearAllMocks());

  it("should call newPassword on execute", async () => {
    userRepository.findByEmail.mockResolvedValue(user);
    const newPasswordUseCase = new NewPasswordUseCase({ userRepository });
    await newPasswordUseCase.execute({ email: user.email, user_id: user.id });
    expect(userRepository.newPassword).toBeCalled();
  });
});
