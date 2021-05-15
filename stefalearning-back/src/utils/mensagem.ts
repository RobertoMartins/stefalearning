export default class Mensagem {
  mensagem: string;
  data?: any;
  code?: number;

  constructor(mensagem, data = undefined, code = undefined, ) {
    this.mensagem = mensagem;
    this.data = data;
    this.code = code;
 
  }
}
