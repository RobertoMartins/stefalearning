import Curso from '../entities/curso.entity';
import Professor from '../entities/professor.entity';
import ProfessorRepository from '../repositories/professor.repository';
import CursoRepository from '../repositories/curso.repository';
import { FilterQuery } from '../utils/database/database';
import Mensagem from '../utils/mensagem';
import { Validador } from '../utils/utils';
import { TipoUsuario } from '../utils/tipo-usuario.enum';
import BusinessException from '../utils/exceptions/business.exception';

export default class ProfessorController {
  async obterPorId(id: number): Promise<Professor> {
    Validador.validarParametros([{ id }]);

    return await ProfessorRepository.obterPorId(id);
  }

  async obter(filtro: FilterQuery<Professor> = {}): Promise<Professor> {
    return await ProfessorRepository.obter(filtro);
  }

  // #pegabandeira : OK
  async listar(filtro: FilterQuery<Professor> = { tipo: TipoUsuario.PROFESSOR }): Promise<Professor[]> {
    return await ProfessorRepository.listar(filtro);
  }

  // #pegabandeira
  async incluir(professor: Professor): Promise<Mensagem> {
    const { nome, email, senha } = professor;

    Validador.validarParametros([{ nome }, { email }, { senha }])
    await Validador.emailUsuarioExiste(email).catch(e => {
      throw new BusinessException(`O email ${email} já está cadastarado`)
    })

    professor.tipo = 1;
    const id = await ProfessorRepository.incluir(professor);
    return new Mensagem('Professor incluido com sucesso!', {
      id,
    });



  }



  async alterar(id: number, professor: Professor) {
    const { nome, email, senha } = professor;

    Validador.validarParametros([{ id }, { nome }, { email }, { senha }]);

    await ProfessorRepository.alterar({ id }, professor);

    return new Mensagem('Professor alterado com sucesso!', {
      id,
    });
  }


  async excluir(id: number): Promise<Mensagem> {

    Validador.validarParametros([{ id }]);

    await Validador.estaLecionando(id).catch(() => {
      throw new BusinessException(`O professor não pode ser excluido, pois ele está vinculado a um curso.`)
    })

    await ProfessorRepository.excluir({ id });
    return new Mensagem('Professor excluido com sucesso!', {
      id,
    });
  }
}
