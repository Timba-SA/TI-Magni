import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { AlertTriangle } from "lucide-react";
import type { Ingrediente } from "../types/insumo.types";

interface InsumoDetailModalProps {
  open: boolean;
  insumo: Ingrediente | null;
  onClose: () => void;
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex justify-between items-start py-3 border-b border-[#F8F8F8]/[0.05] last:border-0">
      <span className="text-xs tracking-wider text-[#F8F8F8]/35 uppercase font-mono">{label}</span>
      <span className="text-sm text-[#F8F8F8] font-medium text-right max-w-[60%]">{value}</span>
    </div>
  );
}

export function InsumoDetailModal({ open, insumo, onClose }: InsumoDetailModalProps) {
  if (!insumo) return null;

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="bg-[#111111] border-[#F8F8F8]/10 text-[#F8F8F8] max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[#F8F8F8] text-lg flex items-center gap-3">
            {insumo.nombre}
            {insumo.es_alergeno && (
              <span className="flex items-center gap-1 text-xs font-normal text-amber-400 bg-amber-400/10 border border-amber-400/20 px-2 py-0.5 rounded-full">
                <AlertTriangle size={11} />
                Alérgeno
              </span>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="py-2">
          {insumo.descripcion && (
            <p className="text-sm text-[#F8F8F8]/50 mb-5 pb-4 border-b border-[#F8F8F8]/[0.05] leading-relaxed">
              {insumo.descripcion}
            </p>
          )}

          <DetailRow label="ID" value={`#${insumo.id}`} />
          <DetailRow
            label="Alérgeno"
            value={
              insumo.es_alergeno ? (
                <span className="inline-flex items-center gap-1 text-amber-400 text-xs">
                  <AlertTriangle size={11} /> Sí, es alérgeno
                </span>
              ) : (
                <span className="text-[#F8F8F8]/40">No</span>
              )
            }
          />
          <DetailRow
            label="Creado"
            value={new Date(insumo.created_at).toLocaleString("es-AR")}
          />
          <DetailRow
            label="Actualizado"
            value={new Date(insumo.updated_at).toLocaleString("es-AR")}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
