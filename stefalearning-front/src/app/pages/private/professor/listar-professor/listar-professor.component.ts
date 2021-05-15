import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/models/curso';
import { Professor } from 'src/app/models/professor';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { CursoService } from 'src/app/services/curso.service';
import { ProfessorService } from 'src/app/services/professor.service';


@Component({
  selector: 'app-listar-professor',
  templateUrl: './listar-professor.component.html',
  styleUrls: ['./listar-professor.component.css']
})
export class ListarProfessorComponent implements OnInit {

  constructor(private professorService: ProfessorService,
    private toastr: ToastrService, private authService: AuthService) { }

  professores: Professor[]
  cursos: Array<Curso>
  usuario: Usuario

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario()


    this.professorService.listar({}).subscribe(
      profs => this.professores = profs
    );

  }

  excluirProfessor = (id: number) => {
    this.professorService.excluir(id).subscribe(
      deletou => {
        this.toastr.success(deletou.mensagem)
        this.ngOnInit()
      },
      erro => { console.log(erro); this.toastr.error(erro.error.message) }
    )
  }



}
