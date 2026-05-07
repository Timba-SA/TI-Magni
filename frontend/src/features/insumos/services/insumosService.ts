import type { Ingrediente, IngredienteFormData } from "../types/insumo.types";
import { fetchApi } from "@/shared/api/apiClient";

// Respuesta paginada del backend
interface IngredienteListResponse {
  items: Ingrediente[];
  total: number;
  skip: number;
  limit: number;
}

/** Obtiene todos los ingredientes (max 100 registros). */
export async function getInsumos(): Promise<Ingrediente[]> {
  const res = await fetchApi<IngredienteListResponse>("/ingredientes?limit=100");
  return res.items;
}

export async function getInsumoById(id: number): Promise<Ingrediente | undefined> {
  try {
    return await fetchApi<Ingrediente>(`/ingredientes/${id}`);
  } catch {
    return undefined;
  }
}

export async function createInsumo(data: IngredienteFormData): Promise<Ingrediente> {
  return fetchApi<Ingrediente>("/ingredientes", {
    method: "POST",
    body: JSON.stringify({
      nombre: data.nombre,
      descripcion: data.descripcion || null,
      es_alergeno: data.es_alergeno,
    }),
  });
}

export async function updateInsumo(
  id: number,
  data: IngredienteFormData
): Promise<Ingrediente | null> {
  try {
    return await fetchApi<Ingrediente>(`/ingredientes/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        nombre: data.nombre,
        descripcion: data.descripcion || null,
        es_alergeno: data.es_alergeno,
      }),
    });
  } catch {
    return null;
  }
}

export async function deleteInsumo(id: number): Promise<boolean> {
  return bajaLogicaInsumo(id);
}

/** Elimina un ingrediente del sistema. */
export async function bajaLogicaInsumo(id: number): Promise<boolean> {
  try {
    await fetchApi(`/ingredientes/${id}`, { method: "DELETE" });
    return true;
  } catch {
    return false;
  }
}

/** Reactivar no aplica al modelo Ingrediente — stub para compatibilidad. */
export async function reactivarInsumo(_id: number): Promise<boolean> {
  return false;
}
