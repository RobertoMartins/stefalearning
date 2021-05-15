import { Curso } from "./curso";
import { Usuario } from "./usuario";


export class Aluno extends Usuario {
    idade?: number;
    formacao?: string;
    cursos?: number[];

}
