export class StockStatusController {
  constructor({ stockStatusUseCase }) {
    this.stockStatusUseCase = stockStatusUseCase;
  }

  async handle(request, response) {
    const status = await this.stockStatusUseCase.execute();

    return response.status(200).json(status);
  }
}
