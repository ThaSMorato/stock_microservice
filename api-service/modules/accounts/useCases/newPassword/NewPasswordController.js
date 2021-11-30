import { getRandomString } from "../../../../utils/getRandomString.js";
import { hash } from "bcrypt";
import { NewPasswordEventFactory } from "../../../../Events/index.js";

export class NewPasswordController {
  constructor({ newPasswordUseCase }) {
    this.newPasswordUseCase = newPasswordUseCase;
  }

  async handle(request, response) {
    const { user_id, user_email } = request;

    const newPassword = getRandomString(8);

    const hashPassword = await hash(newPassword, 8);

    await this.newPasswordUseCase.execute({ password: hashPassword, user_id });

    const newPasswordEvent = NewPasswordEventFactory.createInstance();

    newPasswordEvent.emit({ password: newPassword, email: user_email });

    return response.status(200).send();
  }
}
