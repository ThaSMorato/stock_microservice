import { EventListener } from "./EventListener.js";
import { NewPasswordEvent } from "./NewPasswordEvent.js";
import { StockResponseEvent } from "./StockResponseEvent.js";

class NewPasswordEventFactory {
  static #INSTANCE;
  static createInstance() {
    if (!NewPasswordEventFactory.#INSTANCE) {
      const eventEmitter = EventListener.createInstance();
      NewPasswordEventFactory.#INSTANCE = new NewPasswordEvent({ eventEmitter });
    }

    return NewPasswordEventFactory.#INSTANCE;
  }
}

class StockResponseEventFactory {
  static #INSTANCE;
  static createInstance() {
    if (!StockResponseEventFactory.#INSTANCE) {
      const eventEmitter = EventListener.createInstance();
      StockResponseEventFactory.#INSTANCE = new StockResponseEvent({ eventEmitter });
    }

    return StockResponseEventFactory.#INSTANCE;
  }
}

export { NewPasswordEventFactory, StockResponseEventFactory };
