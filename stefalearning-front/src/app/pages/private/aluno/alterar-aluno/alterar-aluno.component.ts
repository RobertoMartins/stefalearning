import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Aluno } from 'src/app/models/aluno';
import { AlunoService } from 'src/app/services/aluno.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-alterar-aluno',
  templateUrl: './alterar-aluno.component.html',
  styleUrls: ['./alterar-aluno.component.css']
})
export class AlterarAlunoComponent implements OnInit {

  constructor(private alunoService: AlunoService, private activatedRoute: ActivatedRoute, private toastr: ToastrService, 
    private router: Router,
    private authService:AuthService) { }

  aluno: Aluno = new Aluno
  id: number

  async ngOnInit(): Promise<void> {
    await this.activatedRoute.params.subscribe(params => {
      this.id = Number(params['id'])
    })


    await this.alunoService.obter(this.id).subscribe(p => {
      this.aluno = p
    })
  }


  cadastrar=()=>{

    this.alunoService.alterar(this.aluno.id,this.aluno).subscribe(
      (cadastro) => {
        this.toastr.success(cadastro.mensagem);
        this.authService.setUsuario(this.aluno)
        this.router.navigate(['']);
      },
      (err) => {
        this.toastr.error(err.error.message);

      }
    )
  }

}
