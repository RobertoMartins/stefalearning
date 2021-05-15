import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Aluno } from 'src/app/models/aluno';
import { Usuario } from 'src/app/models/usuario';
import { AlunoService } from 'src/app/services/aluno.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-listar-aluno',
  templateUrl: './listar-aluno.component.html',
  styleUrls: ['./listar-aluno.component.css']
})
export class ListarAlunoComponent implements OnInit {

  constructor(
    private alunoService: AlunoService, 
    private authService: AuthService,
    private toastr: ToastrService) { }

  alunos: Aluno[]
  usuario: Usuario

  ngOnInit(): void {
    this.usuario = this.authService.getUsuario()

      this.alunoService.listar().subscribe(
        alunos => this.alunos = alunos


      )
  }


  excluirAluno =  (id:number)=>{
 this.alunoService.excluir(id).subscribe(
      deletou => {
        this.toastr.success(deletou.mensagem)
        this.ngOnInit()
      },
      erro => { console.log(erro); this.toastr.error(erro.error.message) }
    )
  }
    
  

 

}
