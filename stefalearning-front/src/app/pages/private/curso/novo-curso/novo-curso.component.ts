import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Curso } from 'src/app/models/curso';
import { AuthService } from 'src/app/services/auth.service';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-novo-curso',
  templateUrl: './novo-curso.component.html',
  styleUrls: ['./novo-curso.component.css']
})
export class NovoCursoComponent implements OnInit {

  constructor(
    private cursoService: CursoService,
    private toastr: ToastrService,
    private authService: AuthService,
    private activateRouter: ActivatedRoute,
    private router: Router) { }

  curso: Curso = new Curso
  id: number
  title: string = "Novo Curso"
  buttonText: string = "Cadastrar"

  async ngOnInit(): Promise<void> {

    await this.activateRouter.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id']
        this.title = "Editar curso"
        this.buttonText = "Salvar Alterações"

        this.cursoService.obter(this.id).subscribe(c => this.curso = c)
      }
    })



    this.curso.idProfessor = this.authService.getUsuario().id
    this.curso.aulas = []

  }

  cadastrarCurso = () => {

    if (this.id) {
      this.cursoService.alterar(this.curso).subscribe(
        alterou => { this.toastr.success(alterou.mensagem) 
          this.router.navigate(['cursos/detalhe-curso/'+this.curso.id])},
        erro => { this.toastr.error(erro.error.message) }
      )
    } else {
      this.cursoService.incluir(this.curso).subscribe(
        (cadastro) => {
          this.toastr.success(cadastro.mensagem);
          this.router.navigate(['cursos/detalhe-curso/' + cadastro.data.id]);
        },
        (err) => {
          this.toastr.error(err.error.message);
        }
      )
    }
  }
}




