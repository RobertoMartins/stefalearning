import bcrypt from 'bcryptjs';
import Usuario from '../entities/usuario.entity';
import BusinessException from '../utils/exceptions/business.exception';
import UnauthorizedException from '../utils/exceptions/unauthorized.exception';
import usuarioRepository from '../repositories/usuario.repository'
import alunoRepository from '../repositories/aluno.repository'
import cursoRepository from '../repositories/curso.repository';
import professorRepository from '../repositories/professor.repository'
import { TipoUsuario } from './tipo-usuario.enum';
import Mensagem from './mensagem';
import Curso from '../entities/curso.entity';

export const Validador = {



  validarParametros: (parametros: any[]) => {
    if (!parametros) return true;

    const parametrosInvalidos = parametros
      .filter((p) => {
        const attr = Object.keys(p)[0];
        return (
          p[attr] === null ||
          p[attr] === undefined ||
          (typeof p[attr] === 'number' && isNaN(p[attr])) ||
          (typeof p[attr] === 'string' && p[attr] === '')
        );
      })
      .map((p) => Object.keys(p)[0]);

    if (parametrosInvalidos.length) {
      throw new BusinessException(`Os seguintes parametros são obrigatórios: ${parametrosInvalidos.join(', ')}`);
    }
    return true;
  },

  emailUsuarioExiste: async (email: string) => {

    await usuarioRepository.listar({}).then((u) => {
      u.forEach((usuario) => {
        console.log(usuario.email + ' ' + email)
        if (usuario.email == email) {
          throw new BusinessException(`O email ${email} já está cadastarado`)
        }
      })
    })
  },

  nomeCursoExiste: async (nome: string) => {

    await cursoRepository.listar({ nome: nome }).then((c) => {
      if (c.length > 0) {
        throw new BusinessException(`Um curso com o nome ${nome} já está cadastarado`)
      }
    })

  },

  validarSenha: (senha: string, senhaAtual: string) => {
    const isValid = bcrypt.compareSync(senha, senhaAtual);
  

    if (!isValid) {
      throw new UnauthorizedException('Usuário ou senha inválida.');
    }
  },

  criptografarSenha: (senha: string): string => {
    return bcrypt.hashSync(senha, 8);
  },

  cursoTemAluno: async (idCurso: number) => {

    let a = await alunoRepository.listar({ tipo: TipoUsuario.ALUNO })

    await a.forEach((aluno) => {
      if (aluno.cursos.includes(idCurso)) {
        console.log('entrou')
        throw new BusinessException(`O curso possui alunos cadastrados e não pode ser exluido.`)
      }
    })

  },
  nomeAulaExiste: async (nome: string, curso: Curso) => {

    await curso.aulas.forEach(a => {
      if (a.nome === nome) {
        throw new BusinessException(`Ja existe uma aula cadastrada com esse nome.`)
      }
    }

    )

  },

  possuiCurso: async (idAluno: number) => {
    await alunoRepository.obter({ id: idAluno }).then(
      a => {
        if (a.cursos.length > 0) {
          throw new BusinessException(`O aluno não pode ser excluido, pois ele está matriculado em um curso.`)
        }
      }
    )


  },

  estaLecionando: async (idProf: number) => {
    await professorRepository.obterPorId(idProf).then(
      async p => {
       await cursoRepository.listar().then(cursos => cursos.forEach( (c) => {
          if ( c.idProfessor === idProf) {
            console.log('lancou')
            throw new BusinessException(`O professor não pode ser excluido, pois ele está vinculado a um curso.`)
          }
        }))
      }

    )
    return true;
  }


}
