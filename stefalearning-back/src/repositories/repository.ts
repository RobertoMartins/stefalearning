import Entity from '../entities/entity';
import Database, { FilterQuery } from '../utils/database/database';
import { Tables } from '../utils/tables.enum';

export default class Repository<T extends Entity> {
  table: Tables;

  constructor(table: Tables) {
    this.table = table;
  }

  async listar(filtro?: FilterQuery<T>): Promise<T[]> {
    return Database.listar<T>(filtro, this.table);
  }

  async obter(filtro: FilterQuery<T>): Promise<T> {
    return Database.obter<T>(filtro, this.table);
  }

  async obterPorId(id: number): Promise<T> {
    return Database.obterPorId<T>(id, this.table);
  }

  async incluir(dado: T | Partial<T>): Promise<number> {
    return Database.incluir<T>(dado, this.table);
  }

  async alterar(filtro: FilterQuery<T>, dado: Partial<T>): Promise<number> {
    return Database.alterar<T>(filtro, dado, this.table);
  }

  async excluir(filtro: FilterQuery<T>): Promise<number> {
    return Database.excluir<T>(filtro, this.table);
  }
}
