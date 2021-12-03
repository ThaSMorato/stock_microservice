import { ApiError } from "../../../../Error/ApiError.js";
import { User } from "../../entities/User.js";
import { hash } from "bcrypt";

export class CreateUserUseCase {
  userRepository;

  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute({ email, isAdmin = false }) {
    const userExistis = await this.userRepository.findByEmail(email);

    if (userExistis) throw new ApiError("Email already in use", 400);

    const user = new User({ email, isAdmin });
    const hashPassword = await hash(user.password, 8);

    await this.userRepository.create({ email, password: hashPassword, isAdmin });

    return user;
  }
}
