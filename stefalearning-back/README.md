# Hackathon Stefanini

Chegou a hora do desafio final!!!!

# Funcionalidades a serem desenvolvidas

Professor:

Listar => listar todos os professores trazendo a informação de quais cursos eles lecionam

Incluir => incluir um professor seguindo as seguintes regras: Não permitir incluir com e-mail repetido, validar obrigatoriedade dos campos nome, email, senha, criptografar a senha antes de inserir na base utilizando os recursos já disponíveis no código

Alterar => alterar um professor seguindo as seguintes regras: Não permitir alterar o e-mail, validar obrigatoriedade dos campos nome, senha, criptografar a senha antes de inserir na base utilizando os recursos já disponíveis no código, somente o próprio professor pode altera seus dados

Excluir => excluir um professor seguindo as seguintes regras: Não permitir que o professor seja excluido caso esteja vinculado a algum curso, somente um professor pode excluir outro professor

Aluno:

Listar => listar todos os alunos trazendo a informação de quais cursos eles estão matriculados

Incluir => incluir um aluno seguindo as seguintes regras: Não permitir incluir com e-mail repetido, validar obrigatoriedade dos campos nome, email, senha, formacao, idade, criptografar a senha antes de inserir na base utilizando os recursos já disponíveis no código

Alterar => alterar um aluno seguindo as seguintes regras: Não permitir alterar o e-mail, validar obrigatoriedade dos campos nome, senha, criptografar a senha antes de inserir na base utilizando os recursos já disponíveis no código, somente o próprio aluno ou um professor pode altera seus dados

Excluir => excluir um aluno seguindo as seguintes regras: Não permitir que o aluno seja excluido caso esteja matriculado a algum curso, somente um professor pode excluir um aluno

Matricular Curso => matricular um aluno em um curso seguindo as seguintes regras: Não permitir que o aluno matricule-se mais de uma vez no mesmo curso

Curso:

Listar => listar todos os cursos disponiveis

Incluir => incluir um curso seguindo as seguintes regras: Não permitir incluir com nome repetido, validar obrigatoriedade dos campos nome, professor, aulas e descrição, somente um professor pode incluir um curso

Alterar => alterar um curso seguindo as seguintes regras: Validar obrigatoriedade dos campos nome, professor, aulas e descrição, somente um professor pode alterar um curso

Excluir => excluir um curso seguindo as seguintes regras: Não permitir que o curso seja excluido caso tenha alunos matriculados

Aula:

Listar => listar todos as aulas de um determinado curso

Incluir => incluir uma aula seguindo as seguintes regras: Não permitir incluir com nome repetido, validar obrigatoriedade dos campos nome, duracao, curso e topicos, somente um professor pode incluir uma aula

Alterar => alterar uma aula seguindo as seguintes regras: Validar obrigatoriedade dos campos nome, duracao, curso e topicos, somente um professor pode alterar uma aula

Excluir => excluir uma aula seguindo as seguintes regras: somente um professor pode excluir uma aula

Avaliação Curso

Criar funcionalidade para o aluno avaliar o curso seguindo as seguintes regras: a nota vai de 0 a 5, somente uma avaliação por aluno, o aluno pode alterar sua nota de avaliação, professor não pode avaliar o curso

# Pega Bandeira

Você encontrará vários situações onde o código deverá ser melhorado ou até mesmo ajustado.
Para facilitar, coloquei no código #pegabandeira. Essa hashtag apenas indica que tem algo que precisa ser ajustado/melhorado.
Você terá de descobrir o que precisa ser feito

# Nao precisa mexer

backend:
database.ts
database.json
exceptions \*
repository.ts
config.ts
tipo-usuario.enum.ts
utils.ts
mensagem.ts
auth.middleware.ts
entity.ts
index.ts
nodemon.json
