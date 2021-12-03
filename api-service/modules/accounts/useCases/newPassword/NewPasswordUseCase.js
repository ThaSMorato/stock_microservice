import { User } from "../../entities/User.js";
import { hash } from "bcrypt";

export class NewPasswordUseCase {
  userRepository;

  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute({ email, user_id }) {
    const user_data = await this.userRepository.findByEmail(email);

    const user = new User(user_data);

    user.resetPassword();

    const hashPassword = await hash(user.password, 8);

    await this.userRepository.newPassword({ password: hashPassword, id: user_id });

    return user;
  }
}
