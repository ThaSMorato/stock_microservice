import { Mongo } from "../../../../db/Mongo.js";
import { UserMongoRepository } from "../../repositories/UserMongoRepository.js";
import { AuthenticateUserController } from "./AuthenticateController.js";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase.js";

export const AuthenticateUser = async () => {
  const mongoClient = await Mongo.getInstance();
  const userMongoRepository = new UserMongoRepository({ db: mongoClient });
  const authenticateUserUseCase = new AuthenticateUserUseCase({
    userRepository: userMongoRepository,
  });
  const authenticateUserController = new AuthenticateUserController({ authenticateUserUseCase });

  return authenticateUserController;
};
