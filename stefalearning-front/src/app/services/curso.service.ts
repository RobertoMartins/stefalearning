import { HttpClient, HttpEvent, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,of } from 'rxjs';
import { Curso } from '../models/curso';
import { Mensagem } from '../models/mensagem';




const URL = 'http://localhost:3000/stefanini/curso';

@Injectable({
    providedIn: 'root',
  })
export class CursoService{
    constructor(private httpClient: HttpClient) {}

  listar(filtro?: Partial<Curso>): Observable<Curso[]> {

   return this.httpClient.get<Curso[]>(URL)
  }

 
  obter(id:number): Observable<Curso> {
    return this.httpClient.get<Curso>(`${URL}/${id}`);
  }

  incluir(curso: Curso): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL, curso);
  }

  alterar(curso: Curso): Observable<Mensagem> {
    return this.httpClient.put<Mensagem>(URL+'/'+curso.id, curso);
  }

  excluir(idCurso:number):Observable<Mensagem> {
    return this.httpClient.delete<Mensagem>(URL+'/'+idCurso);
  }


}