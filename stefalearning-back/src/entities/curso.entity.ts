import Aula from '../models/aula.model';
import Entity from './entity';

export default class Curso extends Entity {
  nome: string;
  descricao: string;
  idProfessor?: number;
  aulas?: Aula[];


  constructor() {
    super();
  }
}
