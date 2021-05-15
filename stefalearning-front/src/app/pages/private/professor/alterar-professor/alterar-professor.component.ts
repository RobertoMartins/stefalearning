import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Professor } from 'src/app/models/professor';
import { AuthService } from 'src/app/services/auth.service';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-alterar-professor',
  templateUrl: './alterar-professor.component.html',
  styleUrls: ['./alterar-professor.component.css']
})
export class AlterarProfessorComponent implements OnInit {

  constructor(private professorService: ProfessorService, private activatedRoute: ActivatedRoute, private toastr: ToastrService, 
    private router: Router,
    private authService:AuthService) { }

  professor: Professor = new Professor
  id: number

  async ngOnInit(): Promise<void> {
    await this.activatedRoute.params.subscribe(params => {
      this.id = Number(params['id'])
    })


    await this.professorService.obter(this.id).subscribe(p => {
      this.professor = p
      this.professor.senha=undefined
    })
  }


  cadastrar=()=>{

    this.professorService.alterar(this.professor.id,this.professor).subscribe(
      (cadastro) => {
        this.toastr.success(cadastro.mensagem);
        this.authService.setUsuario(this.professor)
        this.router.navigate(['']);
      },
      (err) => {
        this.toastr.error(err.error.message);

      }
    )
  }

}
