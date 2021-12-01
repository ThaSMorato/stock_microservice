import { ApiStockRepositoryFactory } from "../repository/ApiStockRepositoryFactory.js";

const apiStockRepository = ApiStockRepositoryFactory.createInstance();

async function find({ request }, callback) {
  try {
    const stock = await apiStockRepository.getStockById(request.id);
    return callback(null, stock);
  } catch (error) {
    return callback(error, null);
  }
}

export default { find };
