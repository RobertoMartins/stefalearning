import Curso from '../entities/curso.entity';
import { Tables } from '../utils/tables.enum';
import Repository from './repository';

class CursoRepository extends Repository<Curso> {
  constructor() {
    super(Tables.CURSO);
  }
}

export default new CursoRepository();
