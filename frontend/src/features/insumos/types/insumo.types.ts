// ─── Modelo real del backend ─────────────────────────────────────────────────

export interface Ingrediente {
  id: number;
  nombre: string;
  descripcion: string | null;
  es_alergeno: boolean;
  created_at: string;
  updated_at: string;
}

export interface IngredienteFormData {
  nombre: string;
  descripcion: string;
  es_alergeno: boolean;
}

// ─── Tipos del estado de filtros ──────────────────────────────────────────────

export interface IngredienteFiltersState {
  search: string;
  soloAlergenos: boolean;
}

// ─── Alias legacy para compatibilidad con componentes que usen "Insumo" ──────
// Renombrar gradualmente hacia "Ingrediente"
export type Insumo = Ingrediente;
export type InsumoFormData = IngredienteFormData;
export type InsumoFiltersState = IngredienteFiltersState;
