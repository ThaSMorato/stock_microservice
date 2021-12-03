import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../../../../Error/ApiError.js";
import { User } from "../../entities/User.js";

export class AuthenticateUserUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    const user_object = await this.userRepository.findByEmail(email);

    if (!user_object) throw new ApiError("Email or password incorrect", 400);

    const isPasswordCorrect = await compare(password, user_object.password);

    if (!isPasswordCorrect) throw new ApiError("Email or password incorrect", 400);

    const user = new User(user_object);

    const token = jwt.sign(user.get(), process.env.JWT_KEY, {
      subject: user.id.toString(),
    });

    const tokenReturn = { user, token };

    return tokenReturn;
  }
}
