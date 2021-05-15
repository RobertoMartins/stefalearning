import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/curso';
import { Professor } from 'src/app/models/professor';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';
import { CursoService } from 'src/app/services/curso.service';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-listar-curso',
  templateUrl: './listar-curso.component.html',
  styleUrls: ['./listar-curso.component.css']
})
export class ListarCursoComponent implements OnInit {

  constructor(private cursoService:CursoService, private professorService:ProfessorService, private authService:AuthService) { }

  cursos:Curso[]
  professores:Professor[]
  professor:Professor
  usuario:Usuario

  async ngOnInit()  : Promise<void> {
    this.professor= this.authService.getUsuario()

    this.cursoService.listar().subscribe(cursos=> this.cursos = cursos
    )

    this.professorService.listar().subscribe(profs=>{this.professores = profs})

    this.usuario= await this.authService.getUsuario()
  }

  getProfessor = (idProfessor:number):Professor =>{

    return this.professores.find((p)=>p.id===idProfessor)
  }

}
