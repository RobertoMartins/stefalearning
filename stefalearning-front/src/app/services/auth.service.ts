import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { Login } from '../models/login';
import { Usuario } from '../models/usuario';

const URL = 'http://localhost:3000/stefanini/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  nameToken: string = 'jwttoken';
  usuario: Usuario;

  constructor(private router: Router, private http: HttpClient, public jwtHelper: JwtHelperService) {}

  public isAuthenticated(): boolean {
    const token = localStorage.getItem(this.nameToken);
    return !this.jwtHelper.isTokenExpired(token || undefined);
  }

  getUsuario(): Usuario {
    this.usuario = JSON.parse(localStorage.getItem('user'));
    return this.usuario;
  }

  setUsuario(usuario: Usuario) {
    localStorage.setItem('user', JSON.stringify(usuario));
  }

  auth(email: string, senha: string): Observable<Login> {
    return this.http.post<Login>(URL, { email, senha });
  }

  forgout(): Observable<string> {
    return this.http.get<string>(URL);
  }

  getToken(): string {
    return localStorage.getItem(this.nameToken) || '';
  }

  setToken(token: string) {
    localStorage.setItem(this.nameToken, token);
  }

  logout() {
    localStorage.removeItem(this.nameToken);
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }
}
