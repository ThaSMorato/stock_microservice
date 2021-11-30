import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { ApiError } from "../../../../Error/ApiError";

export class AuthenticateUserUseCase {
  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute({ login, password }) {
    const user = await this.userRepository.findByLogin(login);

    if (!user) throw new ApiError("Login or password incorrect", 400);

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect) throw new ApiError("Login or password incorrect", 400);

    const userDTO = Object.keys(user)
      .filter((key) => key !== "password")
      .reduce((acc, key) => ({ ...acc, [key]: user[key] }), {});

    const token = jwt.sign(userDTO, process.env.JWT_KEY, {
      subject: user._id.toString(),
    });

    const tokenReturn = { user: { ...userDTO, _id: user._id.toString() }, token };

    return tokenReturn;
  }
}
