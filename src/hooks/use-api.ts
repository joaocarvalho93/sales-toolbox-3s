import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

const opts = { staleTime: 5 * 60 * 1000 };

export const useModulos = () => useQuery({ queryKey: ["modulos"], queryFn: api.getModulos, ...opts });
export const useModulo = (id: string) =>
  useQuery({ queryKey: ["modulo", id], queryFn: () => api.getModulo(id), ...opts });
export const useCatalogo = () =>
  useQuery({ queryKey: ["catalogo"], queryFn: api.getCatalogo, ...opts });
export const useMarcas = () => useQuery({ queryKey: ["marcas"], queryFn: api.getMarcas, ...opts });
export const useClientes = () =>
  useQuery({ queryKey: ["clientes"], queryFn: api.getClientes, ...opts });
export const useFuncionalidades = () =>
  useQuery({ queryKey: ["funcionalidades"], queryFn: api.getFuncionalidades, ...opts });
export const useCrossSell = () =>
  useQuery({ queryKey: ["cross-sell"], queryFn: api.getCrossSell, ...opts });
export const useIntegracoes = () =>
  useQuery({ queryKey: ["integracoes"], queryFn: api.getIntegracoes, ...opts });
export const useQuiz = () => useQuery({ queryKey: ["quiz"], queryFn: api.getQuiz, ...opts });
export const useObjecoes = () =>
  useQuery({ queryKey: ["objecoes"], queryFn: api.getObjecoes, ...opts });
