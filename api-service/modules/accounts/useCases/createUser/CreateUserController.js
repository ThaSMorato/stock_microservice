export class CreateUserController {
  constructor({ createUserUseCase }) {
    this.createUserUseCase = createUserUseCase;
  }

  async handle(request, response) {
    const { email, isAdmin = false } = request.body;

    const user = await this.createUserUseCase.execute({ email, isAdmin });

    return response.status(201).json({ email, password: user.password });
  }
}
