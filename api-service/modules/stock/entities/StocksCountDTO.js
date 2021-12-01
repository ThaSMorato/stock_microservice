export class StocksCountDTO {
  constructor({ _id, total }) {
    this.stock = _id;
    this.total = total;
  }
}
