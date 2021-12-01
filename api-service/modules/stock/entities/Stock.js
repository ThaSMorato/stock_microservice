export class Stock {
  constructor({ Symbol, Date, Time, Open, High, Low, Close, Volume, Name }) {
    this.Symbol = Symbol;
    this.Date = Date;
    this.Time = Time;
    this.Open = Open;
    this.High = High;
    this.Low = Low;
    this.Close = Close;
    this.Volume = Volume;
    this.Name = Name;
  }
}
