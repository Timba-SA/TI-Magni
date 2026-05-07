import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, Trash2, AlertTriangle } from "lucide-react";
import type { Ingrediente } from "../types/insumo.types";

interface InsumosTableProps {
  insumos: Ingrediente[];
  onView: (insumo: Ingrediente) => void;
  onEdit: (insumo: Ingrediente) => void;
  onDelete: (insumo: Ingrediente) => void;
}

export function InsumosTable({ insumos, onView, onEdit, onDelete }: InsumosTableProps) {
  if (insumos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-4xl mb-4">🧂</p>
        <p className="text-[#F8F8F8]/50 text-sm">
          No se encontraron ingredientes con los filtros aplicados.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-[#F8F8F8]/[0.06] hover:bg-transparent">
            <TableHead className="text-[#F8F8F8]/40 text-xs tracking-wider font-mono uppercase">
              Nombre
            </TableHead>
            <TableHead className="text-[#F8F8F8]/40 text-xs tracking-wider font-mono uppercase">
              Descripción
            </TableHead>
            <TableHead className="text-[#F8F8F8]/40 text-xs tracking-wider font-mono uppercase text-center">
              Alérgeno
            </TableHead>
            <TableHead className="text-[#F8F8F8]/40 text-xs tracking-wider font-mono uppercase">
              Creado
            </TableHead>
            <TableHead className="text-[#F8F8F8]/40 text-xs tracking-wider font-mono uppercase text-right">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {insumos.map((insumo) => (
            <TableRow
              key={insumo.id}
              className="border-[#F8F8F8]/[0.04] hover:bg-[#F8F8F8]/[0.02] transition-colors"
            >
              {/* Nombre */}
              <TableCell className="py-4">
                <p className="text-[#F8F8F8] text-sm font-medium">{insumo.nombre}</p>
                <p className="text-[#F8F8F8]/30 text-xs font-mono">#{insumo.id}</p>
              </TableCell>

              {/* Descripción */}
              <TableCell>
                <span className="text-[#F8F8F8]/50 text-sm">
                  {insumo.descripcion ?? <span className="text-[#F8F8F8]/20 italic">Sin descripción</span>}
                </span>
              </TableCell>

              {/* Alérgeno */}
              <TableCell className="text-center">
                {insumo.es_alergeno ? (
                  <span
                    className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold
                    bg-amber-400/10 text-amber-400 border border-amber-400/20"
                  >
                    <AlertTriangle size={10} />
                    Sí
                  </span>
                ) : (
                  <span className="text-[#F8F8F8]/20 text-xs">—</span>
                )}
              </TableCell>

              {/* Fecha creación */}
              <TableCell>
                <span className="text-[#F8F8F8]/35 text-xs font-mono">
                  {new Date(insumo.created_at).toLocaleDateString("es-AR")}
                </span>
              </TableCell>

              {/* Acciones */}
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-[#F8F8F8]/40 hover:text-[#F8F8F8] hover:bg-[#F8F8F8]/[0.08]"
                    onClick={() => onView(insumo)}
                    title="Ver detalle"
                  >
                    <Eye size={15} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-[#F8F8F8]/40 hover:text-[#FF5A00] hover:bg-[#FF5A00]/10"
                    onClick={() => onEdit(insumo)}
                    title="Editar"
                  >
                    <Pencil size={15} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-[#F8F8F8]/40 hover:text-[#C1121F] hover:bg-[#C1121F]/10"
                    onClick={() => onDelete(insumo)}
                    title="Eliminar"
                  >
                    <Trash2 size={15} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
