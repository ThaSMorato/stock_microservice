import { NewPasswordEventFactory, StockResponseEventFactory } from "../Events/index.js";

export async function onStart(port) {
  console.log(`listening on ${port}`);
  const newPasswordEvent = NewPasswordEventFactory.createInstance();
  const stockResponseEvent = StockResponseEventFactory.createInstance();

  newPasswordEvent.listenToEvent();
  stockResponseEvent.listenToEvent();
}
