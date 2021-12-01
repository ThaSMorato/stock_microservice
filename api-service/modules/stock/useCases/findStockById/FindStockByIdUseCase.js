export class FindStockByIdUseCase {
  constructor({ stockProtoRepository }) {
    this.stockProtoRepository = stockProtoRepository;
  }

  async execute({ id }) {
    return await this.stockProtoRepository.findById(id);
  }
}
