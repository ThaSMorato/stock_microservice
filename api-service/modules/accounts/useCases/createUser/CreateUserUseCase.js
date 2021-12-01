import { ApiError } from "../../../../Error/ApiError.js";

export class CreateUserUseCase {
  userRepository;

  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute({ email, password, isAdmin = false }) {
    const user = await this.userRepository.findByEmail(email);

    if (user) throw new ApiError("Email already in use", 400);

    await this.userRepository.create({ email, password, isAdmin });
  }
}
