export class AuthenticateUserController {
  constructor({ authenticateUserUseCase }) {
    this.authenticateUserUseCase = authenticateUserUseCase;
  }

  async handle(request, response) {
    const { email, password } = request.body;

    const userResponse = await this.authenticateUserUseCase.execute({ email, password });

    return response.status(200).json(userResponse);
  }
}
