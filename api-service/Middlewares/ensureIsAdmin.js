import { ApiError } from "../Error/ApiError.js";

export async function ensureIsAdmin(request, response, next) {
  const isAdmin = request.user_is_admin;

  if (!isAdmin) throw new ApiError("Only admins can access", 403);

  next();
}
