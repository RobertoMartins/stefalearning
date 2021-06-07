<img style="width:100%" src="https://raw.githubusercontent.com/RobertoMartins/stefalearning/master/stefalearning-front/src/assets/print-login.png?token=AN4VEVE64BDK6GHOTQJZCETAY7B6C"/>

## StefaLearning

Stefalearning é aplicação web que simula uma plataforma de ensino EAD. Possui alunos, professores, cursos e aulas. Foi desenvonvida uma API REST com NodeJS + Express. E o front-end com Angular 11 + Bootstrap. Todo o projeto foi escrito com a linguagem TypesScript.
Esse projeto foi desenvolvido como desafio final do Hackaton de Desenvolvimento 2021 organizado pela Stefanini.

## :hammer: Ferramentas & Tecnologias
![Nodejs](https://img.shields.io/badge/-Nodejs-339933?style=flat-square&logo=Node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/-TypeScript-007ACC?style=flat-square&logo=typescript)
![Angular](https://img.shields.io/badge/-Angular-DD0031?style=flat-square&logo=angular)
![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3)
![Bootstrap](https://img.shields.io/badge/-Bootstrap-563D7C?style=flat-square&logo=bootstrap)
![VSCode](https://img.shields.io/badge/-VSCode-007ACC?style=flat-square&logo=visual-studio-code&logoColor=white)


Para mais detalhes da implementação acesse os repositorios do 
<a href="https://github.com/RobertoMartins/stefalearning/tree/master/stefalearning-back">stefalearning-back </a> e <a href="https://github.com/RobertoMartins/stefalearning/tree/master/stefalearning-front">stefalearning-front</a>
    


# Funcionalidades

## Professor:

Listar => listar todos os professores trazendo a informação de quais cursos eles lecionam.

Incluir => incluir um professor seguindo as seguintes regras: Não permitir incluir com e-mail repetido, validar obrigatoriedade dos campos nome, email, senha, criptografar a senha antes de inserir na base utilizando os recursos já disponíveis no código.

Alterar => alterar um professor seguindo as seguintes regras: Não permitir alterar o e-mail, validar obrigatoriedade dos campos nome, senha, criptografar a senha antes de inserir na base utilizando os recursos já disponíveis no código, somente o próprio professor pode altera seus dados.

Excluir => excluir um professor seguindo as seguintes regras: Não permitir que o professor seja excluido caso esteja vinculado a algum curso, somente um professor pode excluir outro professor.

## Aluno:

Listar => listar todos os alunos trazendo a informação de quais cursos eles estão matriculados.

Incluir => incluir um aluno seguindo as seguintes regras: Não permitir incluir com e-mail repetido, validar obrigatoriedade dos campos nome, email, senha, formacao, idade, criptografar a senha antes de inserir na base utilizando os recursos já disponíveis no código.

Alterar => alterar um aluno seguindo as seguintes regras: Não permitir alterar o e-mail, validar obrigatoriedade dos campos nome, senha, criptografar a senha antes de inserir na base utilizando os recursos já disponíveis no código, somente o próprio aluno ou um professor pode altera seus dados.

Excluir => excluir um aluno seguindo as seguintes regras: Não permitir que o aluno seja excluido caso esteja matriculado a algum curso, somente um professor pode excluir um aluno.

Matricular Curso => matricular um aluno em um curso seguindo as seguintes regras: Não permitir que o aluno matricule-se mais de uma vez no mesmo curso.

## Curso:

Listar => listar todos os cursos disponiveis.

Incluir => incluir um curso seguindo as seguintes regras: Não permitir incluir com nome repetido, validar obrigatoriedade dos campos nome, professor, aulas e descrição, somente um professor pode incluir um curso.

Alterar => alterar um curso seguindo as seguintes regras: Validar obrigatoriedade dos campos nome, professor, aulas e descrição, somente um professor pode alterar um curso.

Excluir => excluir um curso seguindo as seguintes regras: Não permitir que o curso seja excluido caso tenha alunos matriculados.

## Aula:

Listar => listar todos as aulas de um determinado curso.

Incluir => incluir uma aula seguindo as seguintes regras: Não permitir incluir com nome repetido, validar obrigatoriedade dos campos nome, duracao, curso e topicos, somente um professor pode incluir uma aula.

Alterar => alterar uma aula seguindo as seguintes regras: Validar obrigatoriedade dos campos nome, duracao, curso e topicos, somente um professor pode alterar uma aula.

Excluir => excluir uma aula seguindo as seguintes regras: somente um professor pode excluir uma aula.

## :gear: Executando a aplicação
A primeira coisa a se fazer, é baixar ou clonar o projeto em sua maquina.<br/>

```sh
  $ git clone https://github.com/RobertoMartins/stefalearning.git 
```

Para rodar o projeto é necessario executar as seguintes etapas:

### 1º- Executando o back-end
<p>Para executar o backend é necessário possuir o <a href="https://nodejs.org/en/">Node</a> instalado.

<p>Com o Node instalado, acesse o diretorio clonado em sua maquina, e abra o terminal(cmd, shell e etc.) nesse local.</p>
Feito isso, digite os comandos:

```sh
  $ cd stefaleraning-back # para acessar a pasta onde está o projeto do back-end.
  $ npm install # para instalar todas dependenias necessárias.
  $ npm start # para rodar a aplicação.
```

<p>Pronto, a api será iniciada, e ja pode ser acessada pelo frontend.</p>


### 2º- Executando o front-end
<p>Com o Node instalado, acesse o diretorio clonado em sua maquina, e abra o terminal(cmd, shell e etc.) nesse local.</p>
Feito isso, digite os comandos:

```sh
  $ cd stefaleraning-front # para acessar a pasta onde está o projeto do front-end.
  $ npm install # para instalar todas dependenias necessárias.
  $ npm start # para rodar a aplicação.
```

Pronto, a aplicação já pode ser aberta no browser.