import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Curso } from 'src/app/models/curso';
import { Professor } from 'src/app/models/professor';
import { Usuario } from 'src/app/models/usuario';
import { CursoService } from 'src/app/services/curso.service';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-detalhe-professor',
  templateUrl: './detalhe-professor.component.html',
  styleUrls: ['./detalhe-professor.component.css']
})
export class DetalheProfessorComponent implements OnInit {

  constructor(
    private professorService: ProfessorService,
    private cursoService: CursoService,
    private router: Router,
    private activateRouter: ActivatedRoute) { }

  professor: Usuario
  profId: number
  profCursos: Curso[]
  cursos: Curso[]

  ngOnInit(): void {

    this.activateRouter.params.subscribe(parametros => {
      if (parametros['id']) {
        this.profId = Number(parametros['id'])

        this.professorService.obter(this.profId).subscribe((prof) => {
          this.professor = prof
        })

      }

      this.cursoService.listar().subscribe((c) => {
        c => this.cursos = c
        this.profCursos = c.filter((curso) => curso.idProfessor === this.profId)
      })
    });

  }
}









