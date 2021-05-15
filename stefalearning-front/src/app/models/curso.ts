import { Aula } from "./aula";


export class Curso  {
    nome: string;
    descricao: string;
    idProfessor?: number;
    aulas?: Aula[];
    id:number
}