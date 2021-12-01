import { ApiError } from "../../../../Error/ApiError.js";
import { StockResponseEventFactory } from "../../../../Events/index.js";

export class FindStockByIdController {
  constructor({ findStockByIdUseCase }) {
    this.findStockByIdUseCase = findStockByIdUseCase;
  }

  async handle(request, response) {
    const { q } = request.query;
    const { user_id } = request;

    if (!q) throw new ApiError("Query must be provided", 400);

    const stock = await this.findStockByIdUseCase.execute({ id: q });

    if (!stock) throw new ApiError("Stock not found", 400);

    const stockEventEmitter = StockResponseEventFactory.createInstance();

    stockEventEmitter.emit({ stock, user_id });

    return response.status(200).json(stock);
  }
}
