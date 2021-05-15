import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, } from 'rxjs';
import { Aluno } from '../models/aluno';
import { Mensagem } from '../models/mensagem';



const URL = 'http://localhost:3000/stefanini/aluno';

@Injectable({
  providedIn: 'root',
})
export class AlunoService {
  constructor(private httpClient: HttpClient) { }

  // #pegabandeira 
  listar(filtro?: Partial<Aluno>): Observable<Aluno[]> {
    return  this.httpClient.get<Aluno[]>(URL)
  }

  obter(id: number): Observable<Aluno> {
    return this.httpClient.get<Aluno>(`${URL}/${id}`);
  }

  incluir(aluno: Aluno): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL, aluno);
  }

  alterar(id:number, aluno:Aluno) : Observable<Mensagem> { 
    return this.httpClient.put<Mensagem>(URL+'/'+id, aluno);
  }

  excluir(id:number) { 
    return this.httpClient.delete<Mensagem>(URL+'/'+id);
  }
}
