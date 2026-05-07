import type { Categoria, CategoriaFormData } from "../types/categoria.types";
import { fetchApi } from "@/shared/api/apiClient";

export async function getCategorias(): Promise<Categoria[]> {
  return fetchApi<Categoria[]>("/categorias");
}

export async function createCategoria(data: CategoriaFormData): Promise<Categoria> {
  return fetchApi<Categoria>("/categorias", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function deleteCategoria(id: number): Promise<Categoria> {
  return fetchApi<Categoria>(`/categorias/${id}`, { method: "DELETE" });
}
