import { ApiError } from "../../../../Error/ApiError.js";

export class FindStockByIdController {
  constructor({ findStockByIdUseCase }) {
    this.findStockByIdUseCase = findStockByIdUseCase;
  }

  async handle(request, response) {
    const { q } = request.query;

    if (!q) throw new ApiError("Query must be provided", 400);

    const stock = await this.findStockByIdUseCase.execute({ id: q });

    if (!stock) throw new ApiError("Stock not found", 400);

    return response.status(200).json(stock);
  }
}
