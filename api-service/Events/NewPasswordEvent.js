const NewPasswordEventName = Symbol("NewPasswordEvent");

export class NewPasswordEvent {
  constructor({ eventEmitter }) {
    this.eventEmitter = eventEmitter;
  }

  listenToEvent() {
    this.eventEmitter.on(NewPasswordEventName, ({ email, password }) => {
      console.log({ email, password });
    });
  }

  emit({ email, password }) {
    this.eventEmitter.emit(NewPasswordEventName, { email, password });
  }
}
