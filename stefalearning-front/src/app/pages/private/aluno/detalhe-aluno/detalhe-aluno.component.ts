import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluno } from 'src/app/models/aluno';
import { Curso } from 'src/app/models/curso';
import { AlunoService } from 'src/app/services/aluno.service';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-detalhe-aluno',
  templateUrl: './detalhe-aluno.component.html',
  styleUrls: ['./detalhe-aluno.component.css']
})
export class DetalheAlunoComponent implements OnInit {

  constructor(
    private cursoService: CursoService,
    private router: Router,
    private alunoService: AlunoService,
    private activateRoute: ActivatedRoute,

  ) { }

  aluno: Aluno = new Aluno
  cursos: Curso[] = []
  idAluno: number

  async ngOnInit(): Promise<void> {

    await this.activateRoute.params.subscribe(params => {
      if (params['id']) {
        this.idAluno = params['id']
        this.alunoService.obter(this.idAluno).subscribe(a => this.aluno = a)
      }
    })

    await this.cursoService.listar().subscribe(cursos => {
      this.cursos = cursos.filter(c => {
        this.aluno.cursos.includes(c.id)
      })
    })



  }




}
