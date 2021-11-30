const StockResponseEventName = Symbol("StockResponseEvent");

export class StockResponseEvent {
  constructor({ eventEmitter }) {
    this.eventEmitter = eventEmitter;
  }

  listenToEvent() {
    this.eventEmitter.on(StockResponseEventName, (payload) => {
      console.log({ ...payload });
    });
  }

  emit(payload) {
    this.eventEmitter.emit(StockResponseEventName, payload);
  }
}
