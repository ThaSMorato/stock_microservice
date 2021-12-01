export class UserHistoryUseCase {
  constructor({ stockMongoRepository }) {
    this.stockMongoRepository = stockMongoRepository;
  }

  async execute(user_id) {
    const history = await this.stockMongoRepository.findByUserId(user_id);

    return history;
  }
}
