import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { parseMessage } from '@angular/localize/src/utils';
import { Observable, } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mensagem } from '../models/mensagem';
import { Professor } from '../models/professor';


const URL = 'http://localhost:3000/stefanini/professor';

@Injectable({
  providedIn: 'root',
})
export class ProfessorService {
  constructor(private httpClient: HttpClient) { }

  // #pegabandeira 
  listar(filtro?: Partial<Professor>): Observable<Professor[]> {
    return  this.httpClient.get<Professor[]>(URL,)
  }

  obter(id: number): Observable<Professor> {
    return this.httpClient.get<Professor>(`${URL}/${id}`);
  }

  incluir(professor: Professor): Observable<Mensagem> {
    return this.httpClient.post<Mensagem>(URL, professor);
  }

  alterar(id:number,professor:Professor) { 
    return this.httpClient.put<Mensagem>(URL+'/'+id, professor);
  }

  excluir(id:number) {
    return this.httpClient.delete<Mensagem>(URL+'/'+id);
  }
}
