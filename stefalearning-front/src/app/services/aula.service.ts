import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { Aluno } from '../models/aluno';
import { Aula } from '../models/aula';
import { Mensagem } from '../models/mensagem';



const URL = 'http://localhost:3000/stefanini/aula';

@Injectable({
  providedIn: 'root',
})
export class AulaService {
  constructor(private httpClient: HttpClient) { }

  // #pegabandeira 
  listar(filtro?: Partial<Aluno>): Observable<Aula[]> {
    return  this.httpClient.get<Aula[]>(URL)
  }

  obter(id: number, idCurso:number): Observable<Aula> {
    return this.httpClient.get<Aula>(URL+'/'+id+'?idCurso='+idCurso);
  }

  incluir(aula: Aula): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(`${URL}`, aula);
  }

  alterar(id:number, aula:Aula) : Observable<Mensagem> { 
    return this.httpClient.put<Mensagem>(URL+'/'+id, aula);
  }

  excluir(idAula:number, idCurso:number) { 
    let params = new HttpParams()
    params.set('id', idAula.toString())
    params.set('idCurso', idCurso.toString())
      return this.httpClient.delete<Mensagem>(URL+'/'+idAula+'?idCurso='+idCurso)
  }
}