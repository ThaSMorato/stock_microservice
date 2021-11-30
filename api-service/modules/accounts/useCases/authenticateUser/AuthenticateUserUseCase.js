import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../../../../Error/ApiError.js";

export class AuthenticateUserUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new ApiError("Email or password incorrect", 400);

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) throw new ApiError("Email or password incorrect", 400);

    const userDTO = Object.keys(user)
      .filter((key) => key !== "password")
      .reduce((acc, key) => ({ ...acc, [key]: user[key] }), {});

    const token = jwt.sign(userDTO, process.env.JWT_KEY, {
      subject: user.id.toString(),
    });

    const tokenReturn = { user: { ...userDTO }, token };

    return tokenReturn;
  }
}
