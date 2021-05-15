import Curso from '../entities/curso.entity';
import Professor from '../entities/professor.entity';
import CursoRepository from '../repositories/curso.repository';
import { FilterQuery } from '../utils/database/database';
import BusinessException from '../utils/exceptions/business.exception';
import Mensagem from '../utils/mensagem';
import { Validador } from '../utils/utils';

export default class CursoController {
  async obterPorId(id: number): Promise<Curso> {
    Validador.validarParametros([{ id }]);
    return await CursoRepository.obterPorId(id);
  }

  async obter(filtro: FilterQuery<Curso> = {}): Promise<Curso> {
    return await CursoRepository.obter(filtro);
  }

  async listar(filtro: FilterQuery<Curso> = {}): Promise<Curso[]> {
    return await CursoRepository.listar(filtro);
  }

  async incluir(curso: Curso): Promise<Mensagem> {
    const { nome, descricao, aulas, idProfessor } = curso;

    await Validador.validarParametros([{ nome }, { descricao }, { aulas }, { idProfessor }])
    await Validador.nomeCursoExiste(nome).catch(e => {
      throw new BusinessException(`Um curso com o nome ${nome} já está cadastarado`)
    })


    const id = await CursoRepository.incluir(curso);
    return new Mensagem('Curso incluido com sucesso!', { id });

  }

  async alterar(id: number, curso: Curso) {
    const { nome, descricao, aulas, idProfessor } = curso;
    Validador.validarParametros([{ id }, { nome }, { descricao }, { aulas }, { idProfessor }]);

    await CursoRepository.alterar({ id }, curso);

    return new Mensagem('Curso alterado com sucesso!', {
      id,
    });
  }

  async excluir(idCurso: number): Promise<Mensagem> {
    await Validador.validarParametros([{ id: idCurso }]);
    await Validador.cursoTemAluno(idCurso).catch(e=>{
      throw new BusinessException(`O curso possui alunos matriculados e não pode ser excluido.`)
    })

    await CursoRepository.excluir({ id: idCurso });
    return new Mensagem('Curso excluido com sucesso!', {
      idCurso,
    });
  }
}
