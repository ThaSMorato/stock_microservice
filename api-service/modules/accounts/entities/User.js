export class User {
  constructor({ _id, login, name, password, isAdmin }) {
    this.id = _id;
    this.login = login;
    this.name = name;
    this.password = password;
    this.isAdmin = isAdmin;
  }
}
