import Aluno from '../entities/aluno.entity';
import AlunoRepository from '../repositories/aluno.repository';
import { FilterQuery } from '../utils/database/database';
import BusinessException from '../utils/exceptions/business.exception';
import Mensagem from '../utils/mensagem';
import { TipoUsuario } from '../utils/tipo-usuario.enum';
import { Validador } from '../utils/utils';

export default class AlunoController {
  async obterPorId(id: number): Promise<Aluno> {
    Validador.validarParametros([{ id }]);
    return await AlunoRepository.obterPorId(id);
  }

  async obter(filtro: FilterQuery<Aluno> = {}): Promise<Aluno> {
    return await AlunoRepository.obter(filtro);
  }

  // #pegabandeira :OK
  async listar(filtro: FilterQuery<Aluno> = { tipo: TipoUsuario.ALUNO }): Promise<Aluno[]> {
    return await AlunoRepository.listar(filtro);
  }

  // #pegabandeira
  async incluir(aluno: Aluno) {
    const { nome, formacao, idade, email, senha } = aluno;


    await Validador.validarParametros([{ nome }, { email }, { senha }, { idade }, { formacao }])
    await Validador.emailUsuarioExiste(email).catch(e => {
      throw new BusinessException(`O email ${email} já está cadastarado`)
    })

    aluno.tipo = 2;
    const id = await AlunoRepository.incluir(aluno);
    return new Mensagem('Aluno incluido com sucesso!', {
      id,
    });

  }

  async alterar(id: number, aluno: Aluno) {
    Validador.validarParametros([{ id }]);
    await AlunoRepository.alterar({ id }, aluno);
    return new Mensagem('Aluno alterado com sucesso!', {
      id,
    });
  }

  async excluir(id: number) {
    await Validador.validarParametros([{ id }]);
    await Validador.possuiCurso(id).catch(e => {
      throw new BusinessException(`O aluno não pode ser excluido, pois ele está matriculado em um curso.`)
    })

    await AlunoRepository.excluir({ id });
    return new Mensagem('Aluno excluido com sucesso!', {
      id,
    });
  }
}
