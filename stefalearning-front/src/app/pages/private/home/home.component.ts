import { Component, OnInit } from '@angular/core';
import { Aluno } from 'src/app/models/aluno';
import { Curso } from 'src/app/models/curso';
import { Professor } from 'src/app/models/professor';
import { Usuario } from 'src/app/models/usuario';
import { AlunoService } from 'src/app/services/aluno.service';
import { AuthService } from 'src/app/services/auth.service';
import { CursoService } from 'src/app/services/curso.service';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private cursoService: CursoService,
    private professorService: ProfessorService,
    private alunoService: AlunoService) { }

  usuario: Usuario = new Usuario
  cursos: Curso[] = []
  aluno: Aluno = new Aluno
  professor: Professor = new Professor

  async ngOnInit(): Promise<void> {
    this.usuario = await this.authService.getUsuario();
    if (this.usuario) {

      if (this.usuario.tipo === 1) {
        await this.professorService.obter(this.usuario.id).subscribe(p => this.professor = p)

        await this.cursoService.listar().subscribe(cursos => this.cursos = (cursos.filter(c => c.idProfessor === this.professor.id)))

      } else {
        await this.alunoService.obter(this.usuario.id).subscribe(a => this.aluno = a)

        await this.cursoService.listar().subscribe(cursos => {
          this.cursos = cursos.filter(c => this.aluno.cursos.includes(c.id)
          )
        })

      }

    }

  }
}
