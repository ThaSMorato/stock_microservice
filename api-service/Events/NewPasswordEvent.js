import { EmailClient } from "../client/EmailClient.js";

const NewPasswordEventName = Symbol("NewPasswordEvent");

export class NewPasswordEvent {
  constructor({ eventEmitter }) {
    this.eventEmitter = eventEmitter;
  }

  listenToEvent() {
    this.eventEmitter.on(NewPasswordEventName, ({ email, password }) => {
      const emailClient = EmailClient.getInstance();
      emailClient.sendNewPassword(email, password);
    });
  }

  emit({ email, password }) {
    this.eventEmitter.emit(NewPasswordEventName, { email, password });
  }
}
