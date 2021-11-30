import { UserMongoRepositoryFactory } from "../../repositories/UserMongoRepositoryFactory.js";
import { NewPasswordController } from "./NewPasswordController.js";
import { NewPasswordUseCase } from "./NewPasswordUseCase.js";

export class NewPasswordFactory {
  static async createInstance() {
    const userMongoRepository = await UserMongoRepositoryFactory.createInstance();
    const newPasswordUseCase = new NewPasswordUseCase({ userRepository: userMongoRepository });
    const newPasswordController = new NewPasswordController({ newPasswordUseCase });

    return newPasswordController;
  }
}
