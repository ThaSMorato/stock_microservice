import { hash } from "bcrypt";
import { getRandomString } from "../../../../utils/getRandomString.js";

export class CreateUserController {
  constructor({ createUserUseCase }) {
    this.createUserUseCase = createUserUseCase;
  }

  async handle(request, response) {
    const { email, isAdmin = false } = request.body;

    const password = getRandomString(8);

    const hashPassword = await hash(password, 8);

    await this.createUserUseCase.execute({ email, password: hashPassword, isAdmin });

    return response.status(201).json({ email, password });
  }
}
