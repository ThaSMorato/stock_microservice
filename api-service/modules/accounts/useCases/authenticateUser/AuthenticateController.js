export class AuthenticateUserController {
  constructor({ authenticateUserUseCase }) {
    this.authenticateUserUseCase = authenticateUserUseCase;
  }

  async handle(request, response) {
    const { login, password } = request.body;

    const userResponse = await this.authenticateUserUseCase.execute({ login, password });

    return response.status(200).json(userResponse);
  }
}
