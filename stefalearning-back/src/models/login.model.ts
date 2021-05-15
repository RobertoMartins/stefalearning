import Usuario from '../entities/usuario.entity';

export default class Login {
  usuario: Partial<Usuario>;
  token: string;
  expires: number;

  constructor() {}
}
