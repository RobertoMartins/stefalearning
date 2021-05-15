import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { DetalheProfessorComponent } from './pages/private/professor/detalhe-professor/detalhe-professor.component';
import { HomeComponent } from './pages/private/home/home.component';
import { ListarProfessorComponent } from './pages/private/professor/listar-professor/listar-professor.component';
import { CadastroComponent } from './pages/public/cadastro/cadastro.component';
import { LoginComponent } from './pages/public/login/login.component';
import { PaginaNaoEncontradaComponent } from './pages/public/pagina-nao-encontrada/pagina-nao-encontrada.component';
import { DetalheAlunoComponent } from './pages/private/aluno/detalhe-aluno/detalhe-aluno.component';
import { ListarAlunoComponent } from './pages/private/aluno/listar-aluno/listar-aluno.component';
import { DetalheCursoComponent } from './pages/private/curso/detalhe-curso/detalhe-curso.component';
import { ListarCursoComponent } from './pages/private/curso/listar-curso/listar-curso.component';
import { NovoCursoComponent } from './pages/private/curso/novo-curso/novo-curso.component';
import { NovaAulaComponent } from './nova-aula/nova-aula.component';
import { AlterarProfessorComponent } from './pages/private/professor/alterar-professor/alterar-professor.component';
import { AlterarAlunoComponent } from './pages/private/aluno/alterar-aluno/alterar-aluno.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: HomeComponent,
  },
  {
    path: 'nova-conta',
    component: CadastroComponent,
  },
  {
    path: 'professores',
    canActivate: [AuthGuardService],
    component: ListarProfessorComponent,
  },
  {
    path: 'professores/detalhe-professor/:id',
    canActivate: [AuthGuardService],
    component: DetalheProfessorComponent,
  },
  {
    path: 'professores/alterar-professor/:id',
    canActivate: [AuthGuardService],
    component: AlterarProfessorComponent,
  },
  {
    path: 'alunos',
    canActivate: [AuthGuardService],
    component: ListarAlunoComponent,
  },
  {
    path: 'alunos/detalhe-aluno/:id',
    canActivate: [AuthGuardService],
    component: DetalheAlunoComponent,
  },
  {
    path: 'alunos/alterar-aluno/:id',
    canActivate: [AuthGuardService],
    component: AlterarAlunoComponent,
  },
  {
    path: 'cursos',
    canActivate: [AuthGuardService],
    component: ListarCursoComponent,
  },
  {
    path: 'cursos/detalhe-curso/:id',
    canActivate: [AuthGuardService],
    component: DetalheCursoComponent,
  },
  {
    path: 'cursos/detalhe-curso/:idCurso/nova-aula',
    canActivate: [AuthGuardService],
    component: NovaAulaComponent,
  },
  {
    path: 'cursos/detalhe-curso/:idCurso/nova-aula/:idAula',
    canActivate: [AuthGuardService],
    component: NovaAulaComponent,
  },
  {
    path: 'cursos/novo-curso',
    canActivate: [AuthGuardService],
    component: NovoCursoComponent,
  },
  {
    path: 'cursos/novo-curso/:id',
    canActivate: [AuthGuardService],
    component: NovoCursoComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '**',
    component: PaginaNaoEncontradaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
