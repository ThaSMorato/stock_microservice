import { ApiError } from "../../../../Error/ApiError";

export class CreateUserUseCase {
  userRepository;

  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute({ name, login, password, isAdmin = false }) {
    const user = await this.userRepository.findByLogin(login);

    if (user) throw new ApiError("Login already in use", 400);

    await this.userRepository.create({ name, login, password, isAdmin });
  }
}
