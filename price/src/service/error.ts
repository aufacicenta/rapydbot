export class InvalidSymbolError extends Error {
  constructor(message = "invalid_symbol") {
    super(message);
    this.message = message;
    this.name = this.constructor.name;
    this.stack = new Error().stack;
  }
}
