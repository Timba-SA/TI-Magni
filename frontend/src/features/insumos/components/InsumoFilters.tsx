import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { IngredienteFiltersState } from "../types/insumo.types";

interface InsumoFiltersProps {
  filters: IngredienteFiltersState;
  onChange: (filters: IngredienteFiltersState) => void;
}

const EMPTY_FILTERS: IngredienteFiltersState = {
  search: "",
  soloAlergenos: false,
};

export function InsumoFilters({ filters, onChange }: InsumoFiltersProps) {
  const hasActiveFilters = filters.search !== "" || filters.soloAlergenos;

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#F8F8F8]/30" />
        <Input
          placeholder="Buscar ingrediente..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className="pl-9 bg-[#111111] border-[#F8F8F8]/10 text-[#F8F8F8] placeholder:text-[#F8F8F8]/25 focus-visible:ring-[#FF5A00]/50 h-9 text-sm"
        />
      </div>

      {/* Solo alérgenos */}
      <button
        onClick={() => onChange({ ...filters, soloAlergenos: !filters.soloAlergenos })}
        className={`h-9 px-4 rounded-md text-sm font-medium border transition-all duration-200 ${
          filters.soloAlergenos
            ? "bg-amber-400/15 border-amber-400/40 text-amber-400"
            : "bg-[#111111] border-[#F8F8F8]/10 text-[#F8F8F8]/50 hover:text-[#F8F8F8]/80"
        }`}
      >
        ⚠ Solo alérgenos
      </button>

      {/* Limpiar */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onChange(EMPTY_FILTERS)}
          className="h-9 text-[#F8F8F8]/40 hover:text-[#F8F8F8] gap-1"
        >
          <X size={14} />
          Limpiar
        </Button>
      )}
    </div>
  );
}
