export class StockStatusUseCase {
  constructor({ stockMongoRepository }) {
    this.stockMongoRepository = stockMongoRepository;
  }

  async execute() {
    const status = await this.stockMongoRepository.getCount();

    return status;
  }
}
