import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aula } from 'src/app/models/aula';
import { Curso } from 'src/app/models/curso';
import { AulaService } from 'src/app/services/aula.service';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-nova-aula',
  templateUrl: './nova-aula.component.html',
  styleUrls: ['./nova-aula.component.css']
})
export class NovaAulaComponent implements OnInit {

  constructor(
    private cursoService: CursoService,
    private activateRouter: ActivatedRoute,
    private aulaService: AulaService,
    private toastr: ToastrService,
    private router: Router) { }

  idCurso: number
  idAula: number
  curso: Curso = new Curso
  aula: Aula = new Aula
  textoTitle: string = 'Nova Aula'
  textoBotao: string = "Cadastrar"
  topicosForm: string = ''

  async ngOnInit(): Promise<void> {

    await this.activateRouter.params.subscribe(async (params) => {
      this.idCurso = params['idCurso']
      if (params['idAula']) {
        this.idAula = params['idAula']
        this.textoBotao = "Salava Alteraçoes"
        this.textoTitle = "Editar Aula"

        await this.cursoService.obter(this.idCurso).subscribe(async c => {
          this.curso = c
          await this.aulaService.obter(this.idAula, this.curso.id).subscribe(a => {
            this.aula = a
            this.aula.topicos.forEach(t => this.topicosForm += t + ';')
          })

        }
        )


      }
    })

    this.cursoService.obter(this.idCurso).subscribe(c=>{this.curso=c})




  }

  cadastrar = () => {
    if (this.idAula) {

      this.aulaService.alterar(this.aula.id, this.aula).subscribe(
        alterou => {
          this.toastr.success(alterou.mensagem)
          this.router.navigate(['cursos/detalhe-curso/' + this.curso.id])
        },
        erro => { this.toastr.error(erro.error.message)}
      )


    } else {

      this.aula.topicos = this.topicosForm.split(";")
      this.aula.idCurso = this.curso.id
      this.aulaService.incluir(this.aula).subscribe(
        incluiu => {
          this.toastr.success(incluiu.mensagem)
          this.router.navigate(['cursos/detalhe-curso/' + this.curso.id])
        },
        erro => { this.toastr.error(erro.error.message) }
      )
    }
  }

}
