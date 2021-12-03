import { getRandomString } from "../../../utils/getRandomString.js";

export class User {
  constructor({ _id, email, isAdmin }) {
    this.email = email;
    this.isAdmin = isAdmin;
    if (_id) {
      this.id = _id;
    } else {
      this.password = getRandomString(8);
    }
  }

  resetPassword() {
    this.password = getRandomString(8);
  }

  get() {
    const { id, email, isAdmin } = this;

    return {
      id,
      email,
      isAdmin,
    };
  }
}
