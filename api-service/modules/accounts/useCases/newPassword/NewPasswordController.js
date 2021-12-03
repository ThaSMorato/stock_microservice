import { NewPasswordEventFactory } from "../../../../Events/index.js";

export class NewPasswordController {
  constructor({ newPasswordUseCase }) {
    this.newPasswordUseCase = newPasswordUseCase;
  }

  async handle(request, response) {
    const { user_id, user_email } = request;

    const user = await this.newPasswordUseCase.execute({ email: user_email, user_id });

    const newPasswordEvent = NewPasswordEventFactory.createInstance();

    newPasswordEvent.emit({ password: user.password, email: user_email });

    return response.status(200).send();
  }
}
