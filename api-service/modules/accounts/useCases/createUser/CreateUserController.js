import { hash } from "bcrypt";

export class CreateUserController {
  constructor({ createUserUseCase }) {
    this.createUserUseCase = createUserUseCase;
  }

  async handle(request, response) {
    const { name, login, password, isAdmin = false } = request.body;

    const hashPassword = await hash(password, 8);

    await this.createUserUseCase.execute({ name, login, password: hashPassword, isAdmin });

    return response.status(201).send();
  }
}
