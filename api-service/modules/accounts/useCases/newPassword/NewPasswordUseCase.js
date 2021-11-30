export class NewPasswordUseCase {
  userRepository;

  constructor({ userRepository }) {
    this.userRepository = userRepository;
  }

  async execute({ password, user_id }) {
    await this.userRepository.newPassword({ password, id: user_id });
  }
}
