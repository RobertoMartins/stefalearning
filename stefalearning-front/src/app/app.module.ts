import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { HttpInterceptorService } from './interceptors/http-interceptor.service';
import { HomeComponent } from './pages/private/home/home.component';
import { ListarProfessorComponent } from './pages/private/professor/listar-professor/listar-professor.component';
import { CadastroComponent } from './pages/public/cadastro/cadastro.component';
import { LoginComponent } from './pages/public/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/public/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { DetalheProfessorComponent } from './pages/private/professor/detalhe-professor/detalhe-professor.component';
import { ListarAlunoComponent } from './pages/private/aluno/listar-aluno/listar-aluno.component';
import { DetalheAlunoComponent } from './pages/private/aluno/detalhe-aluno/detalhe-aluno.component';
import { ListarCursoComponent } from './pages/private/curso/listar-curso/listar-curso.component';
import { NovoCursoComponent } from './pages/private/curso/novo-curso/novo-curso.component';
import { CommonModule } from '@angular/common';
import { DetalheCursoComponent } from './pages/private/curso/detalhe-curso/detalhe-curso.component';
import { NovaAulaComponent } from './pages/private/curso/nova-aula/nova-aula.component';
import { AlterarProfessorComponent } from './pages/private/professor/alterar-professor/alterar-professor.component';
import { AlterarAlunoComponent } from './pages/private/aluno/alterar-aluno/alterar-aluno.component';





export function tokenGetter() {
  return localStorage.getItem('jwttoken');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListarProfessorComponent,
    CadastroComponent,
    HomeComponent,
    PaginaNaoEncontradaComponent,
    HeaderComponent,
    DetalheProfessorComponent,
    ListarAlunoComponent,
    DetalheAlunoComponent,
    ListarCursoComponent,
    NovoCursoComponent,
    DetalheCursoComponent,
    NovaAulaComponent,
    AlterarProfessorComponent,
    AlterarAlunoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgbModule,
    BrowserAnimationsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
  ],
  providers: [
    HttpInterceptorService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true,
    },
    AuthGuardService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
