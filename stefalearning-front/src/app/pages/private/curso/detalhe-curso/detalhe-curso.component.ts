import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aluno } from 'src/app/models/aluno';
import { Curso } from 'src/app/models/curso';
import { Professor } from 'src/app/models/professor';
import { Usuario } from 'src/app/models/usuario';
import { AlunoService } from 'src/app/services/aluno.service';
import { AulaService } from 'src/app/services/aula.service';
import { AuthService } from 'src/app/services/auth.service';
import { CursoService } from 'src/app/services/curso.service';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-detalhe-curso',
  templateUrl: './detalhe-curso.component.html',
  styleUrls: ['./detalhe-curso.component.css']
})
export class DetalheCursoComponent implements OnInit {

  constructor(
    private cursoService: CursoService,
    private activateRouter: ActivatedRoute,
    private professorService: ProfessorService,
    private alunoService: AlunoService,
    private authService: AuthService,
    private aulaService: AulaService,
    private toastr: ToastrService,
    private router: Router) { }

  alunos: Aluno[] = []
  curso: Curso = new Curso
  usuario: Usuario = new Usuario
  professor: Professor = new Professor
  isMatriculado: boolean = false
  aluno: Aluno = new Aluno
  id: number


  async ngOnInit() {
    this.curso.aulas = []

    await this.activateRouter.params.subscribe(parametros => {
      if (parametros['id']) {
        this.id = parametros['id']
      }
    })

    await this.cursoService.obter(this.id).subscribe(curso => {
      this.curso = curso
      this.professorService.obter(this.curso.idProfessor).subscribe(prof => {
        this.professor = prof
      })
    })

    await this.alunoService.listar().subscribe(alunos => {
      this.alunos = alunos.filter((a => a.cursos.includes(this.curso.id)))


    })

    this.usuario = await this.authService.getUsuario()
    await this.alunoService.obter(this.usuario.id).subscribe(a => {
      if (a.cursos.includes(this.curso.id)) {
        this.isMatriculado = true
      }
    })

  }

  matricular = (idCurso: number) => {
    this.alunoService.obter(this.usuario.id).subscribe(a => {
      console.log(a)
      this.aluno = a
      this.aluno.cursos.push(idCurso)
      this.alunoService.alterar(this.aluno.id, { cursos: this.aluno.cursos }).subscribe(
        (alterou) => {
          this.ngOnInit()
          this.toastr.success(alterou.mensagem)
        },
        (erro) => this.toastr.error(erro.error.mensagem)
      )

    })

  }

  desmatricular = (idCurso: number, idAluno?: number) => {
    if (idAluno) {
      return
    }

    this.alunoService.obter(this.usuario.id).subscribe(a => {
      this.aluno = a
      this.aluno.cursos.splice(this.aluno.cursos.indexOf(idCurso), 1)
      this.alunoService.alterar(this.aluno.id, this.aluno).subscribe(
        (alterou) => {
          this.isMatriculado = false
          this.ngOnInit()
          this.toastr.success(alterou.mensagem)
        },
        (erro) => this.toastr.error(erro.error.mensagem)
      )

    })

  }

  excluirCurso(idCurso: number) {
    this.cursoService.excluir(idCurso).subscribe(
      deletou => {
        this.toastr.success(deletou.mensagem)
        this.router.navigate(['/cursos'])
      },
      erro => { console.log(erro); this.toastr.error(erro.error.message) }
    )
  }

  removerAula(idAula:number){
    this.aulaService.excluir(idAula,this.curso.id).subscribe(
      excluiu=>{this.toastr.success(excluiu.mensagem)
        this.ngOnInit()
      
      },
      erro=>{this.toastr.error(erro.error.message)}
    )
  }

}