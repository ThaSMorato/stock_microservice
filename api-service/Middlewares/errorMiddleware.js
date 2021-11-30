export const errorHandler = (err, request, response, next) => {
  if ("code" in err) {
    return response.status(err.code).json({ error: err.message });
  }
  return response.status(500).json({ error: err.message });
};
