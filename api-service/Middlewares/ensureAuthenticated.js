import jwt from "jsonwebtoken";
import { ApiError } from "../Error/ApiError.js";
import { UserMongoRepositoryFactory } from "../modules/accounts/repositories/UserMongoRepositoryFactory.js";

export async function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization;

  if (!authHeader) throw new ApiError("Authentication needed", 401);

  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer") throw new ApiError("Invalid token type", 401);

  try {
    const { sub: user_id } = jwt.verify(token, process.env.JWT_KEY);

    const userMongoRepository = await UserMongoRepositoryFactory.createInstance();

    const user = await userMongoRepository.findById(user_id);

    if (!user) throw new ApiError("User does not exists", 404);

    request.user_id = user_id;
    request.user_email = user.email;
    request.user_is_admin = user.isAdmin;

    next();
  } catch (err) {
    throw new ApiError("Invalid token", 401);
  }
}
