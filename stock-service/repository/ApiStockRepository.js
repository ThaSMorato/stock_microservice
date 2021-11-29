class ApiStockRepository {
  constructor({ api }) {
    this.api = api;
  }

  async getStockById(id) {
    const stock = await this.api.get({ id });

    return { [id]: stock };
  }
}

export { ApiStockRepository };
