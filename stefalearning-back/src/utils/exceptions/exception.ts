export default class Exception extends Error {
  message: string;
  status: number;

  constructor(message: string, status: number = 400) {
    super();
    this.message = message;
    this.status = status;
  }
}
