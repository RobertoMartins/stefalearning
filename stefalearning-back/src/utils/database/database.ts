import fs from 'fs';
import NodeCache from 'node-cache';
import Entity from '../../entities/entity';

export type RootQuerySelector = {
  [key: string]: any;
};

export type QuerySelector<T> = {
  $eq?: T;
  $gt?: T;
  $gte?: T;
  $lt?: T;
  $lte?: T;
  $ne?: T;
  $exists?: boolean;
};

type RegExpForString<T> = T extends string ? RegExp | T : T;

export type Condition<T> = Query<T> | QuerySelector<Query<T>>;
type Query<T> = T extends ReadonlyArray<infer U> ? T | RegExpForString<U> : RegExpForString<T>;

export type FilterQuery<T> = {
  [P in keyof T]?: Condition<T[P]>;
} &
  RootQuerySelector;

let nodeCache: NodeCache;

const FILTER = {
  $eq: <T>(dado: T, attr: string, value: any) => dado[attr] === value,
  $gt: <T>(dado: T, attr: string, value: any) => dado[attr] > value,
  $gte: <T>(dado: T, attr: string, value: any) => dado[attr] >= value,
  $lt: <T>(dado: T, attr: string, value: any) => dado[attr] < value,
  $lte: <T>(dado: T, attr: string, value: any) => dado[attr] <= value,
  $ne: <T>(dado: T, attr: string, value: any) => dado[attr] !== value,
  $exists: <T>(dado: T, attr: string) => dado[attr] !== undefined,
};

class Database {
  async connect(): Promise<NodeCache.Stats> {
    nodeCache = new NodeCache();
    const json = require('../../../database.json');
    Object.keys(json).forEach((k) => {
      nodeCache.set(k, json[k]);
    });

    return nodeCache.stats;
  }

  async listar<T extends Entity>(filtro: FilterQuery<T>, table: string): Promise<T[]> {
    const dados: T[] = nodeCache.get(table);
    return filtro ? this.filtrar(dados, filtro) : dados;
  }

  async obter<T extends Entity>(filtro: FilterQuery<T>, table: string) {
    const dados: T[] = nodeCache.get(table);
    return this.filtrar(dados, filtro)[0];
  }

  async obterPorId<T extends Entity>(id: number, table: string): Promise<T> {
    const dados: T[] = nodeCache.get(table);
    return this.filtrarById(dados, id);
  }

  async incluir<T extends Entity>(dado: T | Partial<T>, table: string) {
    const dados = (nodeCache.get(table) as Array<T>) || [];
    dado.id = dados.length ? dados[dados.length - 1].id + 1 : 1;
    dados.push(dado as T);
    this.atualizarBase(table, dados);
    return dado.id;
  }

  async alterar<T extends Entity>(filtro: FilterQuery<T>, dado: Partial<T>, table: string) {
    const dados = (nodeCache.get(table) as Array<T>) || [];
    const registrosAlterados = this.filtrar(dados, filtro).map((d) => {
      Object.keys(dado)
        .filter((k) => k !== 'id')
        .forEach((k) => {
          d[k] = dado[k];
        });
      return d;
    });

    dados.map((dO) => {
      dO = registrosAlterados.find((dA) => dado.id === dO.id);
    });

    this.atualizarBase(table, dados);
    return registrosAlterados.length;
  }

  async excluir<T extends Entity>(filtro: FilterQuery<T>, table: string) {
    const dados = (nodeCache.get(table) as Array<T>) || [];
    const dadosFiltrados = this.filtrar(dados, filtro);
    const dadosNaoExcluidos = dados.filter((dO) => dadosFiltrados.findIndex((df) => df.id === dO.id));
    this.atualizarBase(table, dadosNaoExcluidos);
    return dados.length - dadosNaoExcluidos.length;
  }

  private aplicarFiltro<T extends Entity>(filter: [string, any], dados: T[]): T[] {
    return dados.filter((d) => {
      if (typeof filter[1] === 'object') {
        const [operator] = Object.keys(filter[1]);
        return FILTER[operator](d, filter[0], filter[1][operator]);
      }
      return d[filter[0]] === filter[1];
    });
  }

  private filtroRecursivo<T extends Entity>(filters: [string, any][], dados: T[]) {
    return filters.reduce((list: any[], filter: [string, any]) => {
      list = this.aplicarFiltro(filter, list);
      return list;
    }, dados);
  }

  private filtrar<T extends Entity>(dados: T[], filtro: FilterQuery<T>): T[] {
    const filters = Object.entries(filtro);
    return this.filtroRecursivo(filters, dados);
  }

  private filtrarById<T extends Entity>(dados: T[], id: any) {
    return dados.filter((d) => d.id === id)[0];
  }

  private writeJson(table, dados) {
    const json = require('../../../database.json');
    json[table] = dados;
    fs.writeFileSync('./database.json', JSON.stringify(json));
  }

  private atualizarBase<T extends Entity>(table: string, dados: T[]) {
    nodeCache.set(table, dados);
    this.writeJson(table, dados);
  }
}

export default new Database();
