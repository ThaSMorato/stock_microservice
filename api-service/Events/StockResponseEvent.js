import { StockMongoRepositoryFactory } from "../modules/stock/repositories/StockMongoRepositoryFactory.js";

const StockResponseEventName = Symbol("StockResponseEvent");

export class StockResponseEvent {
  constructor({ eventEmitter }) {
    this.eventEmitter = eventEmitter;
  }

  listenToEvent() {
    this.eventEmitter.on(StockResponseEventName, async ({ stock, user_id }) => {
      const stockMongoRepo = await StockMongoRepositoryFactory.createInstance();
      await stockMongoRepo.create(stock, user_id);
    });
  }

  emit({ stock, user_id }) {
    this.eventEmitter.emit(StockResponseEventName, { stock, user_id });
  }
}
