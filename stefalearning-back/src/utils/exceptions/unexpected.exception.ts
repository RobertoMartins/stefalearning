import Exception from './exception';

export default class BusinessException extends Exception {
  constructor(message: string, status: number = 500) {
    super(message, status);
  }
}
