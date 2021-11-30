export class User {
  constructor({ _id, email, name, password, isAdmin }) {
    this.id = _id;
    this.email = email;
    this.name = name;
    this.password = password;
    this.isAdmin = isAdmin;
  }
}
