import { Mongo } from "../../../../db/Mongo.js";
import { UserMongoRepository } from "../../repositories/UserMongoRepository.js";
import { CreateUserController } from "./CreateUserController.js";
import { CreateUserUseCase } from "./CreateUserUseCase.js";

export const CreateUser = async () => {
  const mongoClient = await Mongo.getInstance();
  const userMongoRepository = new UserMongoRepository({ db: mongoClient });
  const createUserUseCase = new CreateUserUseCase({ userRepository: userMongoRepository });
  const createUserController = new CreateUserController({ createUserUseCase });

  return createUserController;
};
