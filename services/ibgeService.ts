import { Estado, Municipio } from '../types/ibge';

const BASE_URL = 'https://servicodados.ibge.gov.br/api/v1';

export async function getEstados(): Promise<Estado[]> {
  const response = await fetch(`${BASE_URL}/localidades/estados?orderBy=nome`);

  if (!response.ok) {
    throw new Error('Erro ao buscar estados');
  }

  const data: Estado[] = await response.json();
  return data;
}

export async function getMunicipios(uf: string): Promise<Municipio[]> {
  const response = await fetch(`${BASE_URL}/localidades/estados/${uf}/municipios?orderBy=nome`);

  if (!response.ok) {
    throw new Error('Erro ao buscar municípios');
  }

  const data: Municipio[] = await response.json();
  return data;
}