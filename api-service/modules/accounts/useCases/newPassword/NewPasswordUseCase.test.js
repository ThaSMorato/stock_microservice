import { describe, jest, it, expect, beforeEach } from "@jest/globals";
import { NewPasswordUseCase } from "./NewPasswordUseCase";

describe("#NewPasswordUseCase", () => {
  const userRepository = {
    newPassword: jest.fn(),
  };

  const password = "112233";
  const id = "123";

  beforeEach(() => jest.clearAllMocks());

  it("should call newPassword on execute", async () => {
    const newPasswordUseCase = new NewPasswordUseCase({ userRepository });
    await newPasswordUseCase.execute({ password, user_id: id });
    expect(userRepository.newPassword).toBeCalledWith({ password, id });
  });
});
