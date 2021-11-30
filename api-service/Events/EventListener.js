import { EventEmitter } from "events";

export class EventListener {
  static #INSTANCE;

  static createInstance() {
    if (!EventListener.#INSTANCE) {
      EventListener.#INSTANCE = new EventEmitter();
    }

    return EventListener.#INSTANCE;
  }
}
