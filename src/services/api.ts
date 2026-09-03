/**
 * Camada de acesso à API REST externa.
 *
 * A API real ainda não foi definida. Enquanto isso, `apiFetch` faz o fetch
 * normalmente e, em caso de indisponibilidade (ou quando não há base URL
 * configurada), devolve o mock correspondente ao endpoint. Quando a API
 * existir, basta definir VITE_API_BASE_URL e remover os mocks.
 */

import * as mock from "./mock-data";

export const API_BASE_URL: string =
  (import.meta.env["VITE_API_BASE_URL"] as string | undefined) ?? "";

export async function apiFetch<T>(path: string, fallback: T, init?: RequestInit): Promise<T> {
  if (!API_BASE_URL) {
    // Simula latência de rede enquanto a API real não existe.
    await new Promise((r) => setTimeout(r, 180));
    return fallback;
  }
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      headers: { "Content-Type": "application/json" },
      ...init,
    });
    if (!res.ok) throw new Error(`API ${path} respondeu ${res.status}`);
    return (await res.json()) as T;
  } catch (err) {
    console.warn(`[api] falha em ${path}, usando dados placeholder`, err);
    return fallback;
  }
}

export type Modulo = {
  id: string;
  nome: string;
  descricao: string;
  detalhe: string;
  categoria: string;
  beneficios: string[];
};

export type ItemCatalogo = {
  id: string;
  nome: string;
  preco: number;
  secao: "instalacao" | "mensalidade" | "adicionais";
};

export type Marca = {
  id: string;
  nome: string;
  gmvMedio: number;
  lojas: number;
  mensalidade: number;
};

export type Cliente = {
  id: string;
  marca: string;
  subtabela: string;
  culinaria: string;
  status: "Ativo" | "Em implantação" | "Churn" | "Prospect";
  mensalidade2026: number;
  cnpj: string;
  responsavel: string;
  email: string;
  telefone: string;
  cidade: string;
  uf: string;
  lojas: number;
  gmvMensal: number;
  ticketMedio: number;
  pedidosMes: number;
  inicioContrato: string;
  fimContrato: string;
  modulos: string[];
  integracoes: string[];
  gerenteConta: string;
  nps: number;
  ultimaInteracao: string;
  observacoes: string;
};

export type Funcionalidade = {
  id: string;
  nome: string;
  resumo: string;
  detalhe: string;
};

export type CrossSell = { id: string; nome: string; descricao: string; bullets: string[] };
export type Integracao = { id: string; nome: string; descricao: string; categoria: string };

export type QuizPergunta = {
  id: string;
  pergunta: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
};

export type Objecao = {
  id: string;
  objecao: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
};

export const api = {
  getModulos: () => apiFetch<Modulo[]>("/modulos", mock.modulos),
  getModulo: async (id: string) => (await api.getModulos()).find((m) => m.id === id) ?? null,
  getCatalogo: () => apiFetch<ItemCatalogo[]>("/catalogo", mock.catalogo),
  getMarcas: () => apiFetch<Marca[]>("/marcas", mock.marcas),
  getClientes: () => apiFetch<Cliente[]>("/clientes", mock.clientes),
  getFuncionalidades: () => apiFetch<Funcionalidade[]>("/funcionalidades", mock.funcionalidades),
  getCrossSell: () => apiFetch<CrossSell[]>("/cross-sell", mock.crossSell),
  getIntegracoes: () => apiFetch<Integracao[]>("/integracoes", mock.integracoes),
  getQuiz: () => apiFetch<QuizPergunta[]>("/quiz", mock.quiz),
  getObjecoes: () => apiFetch<Objecao[]>("/objecoes", mock.objecoes),
};
