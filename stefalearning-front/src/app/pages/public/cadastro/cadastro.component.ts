import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aluno } from 'src/app/models/aluno';
import { Professor } from 'src/app/models/professor';
import { Usuario } from 'src/app/models/usuario';
import { AlunoService } from 'src/app/services/aluno.service';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  constructor(
    private professorService: ProfessorService, 
    private alunoService:AlunoService,
    private toastr: ToastrService, 
    private router: Router) { }

  nome: string
  email: string
  senha: string
  formacao: string
  idade: number

  aluno: Aluno = new Aluno
  professor: Professor = new Professor

  tipoUsuario: number

  ngOnInit(): void {
    this.tipoUsuario = 1
  }


  cadastrar = (tipo: number) => {

    if (tipo == 1) {
      this.professor.nome = this.nome
      this.professor.email = this.email
      this.professor.senha = this.senha

      this.professorService.incluir(this.professor).subscribe(
        (cadastro) => {
          this.toastr.success(cadastro.mensagem);
          this.router.navigate(['']);
        },
        (err) => {
          this.toastr.error(err.error.message);

        })

    } else {
      this.aluno.nome = this.nome
      this.aluno.email = this.email
      this.aluno.senha = this.senha
      this.aluno.formacao = this.formacao
      this.aluno.idade = this.idade
      this.aluno.cursos = []

      this.alunoService.incluir(this.aluno).subscribe(
        (cadastro) => {
          this.toastr.success(cadastro.mensagem);
          this.router.navigate(['']);
        },
        (err) => {
          this.toastr.error(err.error.message);

        })
    }

  }

}
