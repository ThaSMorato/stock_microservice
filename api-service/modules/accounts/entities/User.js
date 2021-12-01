export class User {
  constructor({ _id, email, password, isAdmin }) {
    this.id = _id;
    this.email = email;
    this.password = password;
    this.isAdmin = isAdmin;
  }
}
