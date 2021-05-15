import Exception from './exception';

export default class BusinessException extends Exception {
  constructor(message: string, status: number = 400) {
    super(message, status);
  }
}
