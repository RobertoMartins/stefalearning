import Aula from '../models/aula.model';
import CursoRepository from '../repositories/curso.repository';
import BusinessException from '../utils/exceptions/business.exception';
import Mensagem from '../utils/mensagem';
import { Validador } from '../utils/utils';

export default class AulaController {
  async obterPorId(id: number, idCurso: number): Promise<Aula> {
    Validador.validarParametros([{ id }, { idCurso }]);
    const curso = await CursoRepository.obterPorId(idCurso);
    return curso.aulas.find((a) => a.id === id);
  }

  async listar(idCurso: number): Promise<Aula[]> {
    Validador.validarParametros([{ idCurso }]);
    const curso = await CursoRepository.obterPorId(idCurso);
    return curso.aulas;
  }

  async incluir(aula: Aula) {

    const { nome, duracao, topicos, idCurso } = aula;
    await Validador.validarParametros([{ nome }, { duracao }, { topicos }, { idCurso }]);

    const curso = await CursoRepository.obterPorId(idCurso);

    await Validador.nomeAulaExiste(aula.nome, curso).catch(e => {
      throw new BusinessException(`Ja existe uma aula cadastrada com esse nome.`)
    })



    let idAnterior

    if (curso.aulas.length === 0) {
      idAnterior = curso.aulas.length;
    } else {
      idAnterior = curso.aulas[curso.aulas.length - 1].id

    }

    aula.id = idAnterior ? idAnterior + 1 : 1;
    curso.aulas.push(aula)
    await CursoRepository.alterar({ id: idCurso }, curso);

    return new Mensagem('Aula incluido com sucesso!', {
      id: aula.id,
      idCurso,
    });
  }

  async alterar(id: number, aula: Aula) {
    const { nome, duracao, topicos, idCurso } = aula;
    Validador.validarParametros([{ id }, { idCurso }, { nome }, { duracao }, { topicos }]);

    
    

    const curso = await CursoRepository.obterPorId(idCurso);

    await Validador.nomeAulaExiste(aula.nome, curso).catch(e => {
      throw new BusinessException(`Ja existe uma aula cadastrada com esse nome.`)
    })

    curso.aulas.map((a) => {
      if (a.id === id) {
        Object.keys(aula).forEach((k) => {
          a[k] = aula[k];
        });
      }
    });

    await CursoRepository.alterar({ id: idCurso }, curso);

    return new Mensagem('Aula alterado com sucesso!', {
      id,
      idCurso,
    });
  }

  async excluir(id: number, idCurso: number) {
    Validador.validarParametros([{ id }, { idCurso }]);

    const curso = await CursoRepository.obterPorId(idCurso);

    curso.aulas = curso.aulas.filter((a) => a.id !== id);

    await CursoRepository.alterar({ id: idCurso }, curso);

    return new Mensagem('Aula excluido com sucesso!');
  }
}
