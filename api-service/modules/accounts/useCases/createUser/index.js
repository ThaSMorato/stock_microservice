import { UserMongoRepositoryFactory } from "../../repositories/UserMongoRepositoryFactory.js";
import { CreateUserController } from "./CreateUserController.js";
import { CreateUserUseCase } from "./CreateUserUseCase.js";

export class CreateUserFactory {
  static async createInstance() {
    const userMongoRepository = await UserMongoRepositoryFactory.createInstance();
    const createUserUseCase = new CreateUserUseCase({ userRepository: userMongoRepository });
    const createUserController = new CreateUserController({ createUserUseCase });

    return createUserController;
  }
}
