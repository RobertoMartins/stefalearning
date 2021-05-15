import { Usuario } from './usuario';

export interface Login {
  usuario: Partial<Usuario>;
  token: string;
  expires: number;
}
