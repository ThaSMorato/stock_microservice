import { UserMongoRepositoryFactory } from "../../repositories/UserMongoRepositoryFactory.js";
import { AuthenticateUserController } from "./AuthenticateController.js";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase.js";

export class AuthenticateUserFactory {
  static async createInstance() {
    const userMongoRepository = await UserMongoRepositoryFactory.createInstance();
    const authenticateUserUseCase = new AuthenticateUserUseCase({
      userRepository: userMongoRepository,
    });
    const authenticateUserController = new AuthenticateUserController({ authenticateUserUseCase });

    return authenticateUserController;
  }
}
