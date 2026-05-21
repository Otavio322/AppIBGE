export type Estado = {
  id: number;
  sigla: string;
  nome: string;
  regiao: {
    id: number;
    sigla: string;
    nome: string;
  };
};

export type Municipio = {
  id: number;
  nome: string;
};