import { Package, AlertTriangle } from "lucide-react";
import type { Ingrediente } from "../types/insumo.types";
import { DashboardCard } from "@/components/admin/DashboardCard";

interface InsumoStatsProps {
  insumos: Ingrediente[];
}

export function InsumoStats({ insumos }: InsumoStatsProps) {
  const total = insumos.length;
  const alergenos = insumos.filter((i) => i.es_alergeno).length;

  return (
    <div className="grid grid-cols-2 gap-4">
      <DashboardCard
        title="Total ingredientes"
        value={total}
        subtitle="registrados en el sistema"
        icon={<Package size={22} />}
        accent="orange"
      />
      <DashboardCard
        title="Alérgenos"
        value={alergenos}
        subtitle={alergenos > 0 ? "requieren etiquetado" : "ninguno registrado"}
        icon={<AlertTriangle size={22} />}
        accent="yellow"
      />
    </div>
  );
}
