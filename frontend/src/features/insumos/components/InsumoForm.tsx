import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Ingrediente, IngredienteFormData } from "../types/insumo.types";

interface InsumoFormProps {
  open: boolean;
  insumo?: Ingrediente | null;
  onClose: () => void;
  onSave: (data: IngredienteFormData) => void;
  serverError?: string | null;
}

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="text-[10px] tracking-[0.15em] text-white/35 uppercase font-mono flex items-center gap-1">
      {children}
      {required && <span className="text-[#FF5A00] text-[10px] leading-none">*</span>}
    </label>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-[11px] text-red-400/80 mt-1 flex items-center gap-1">
      <span className="inline-block w-1 h-1 rounded-full bg-red-400/80" />
      {message}
    </p>
  );
}

const inputClass =
  "w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-sm text-white/90 placeholder:text-white/20 outline-none focus:border-[#FF5A00]/40 focus:ring-2 focus:ring-[#FF5A00]/10 focus:bg-white/[0.05] transition-all duration-200 hover:border-white/15 hover:bg-white/[0.04]";

export function InsumoForm({ open, insumo, onClose, onSave, serverError }: InsumoFormProps) {
  const isEditing = !!insumo;
  const [saving, setSaving] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IngredienteFormData>({
    defaultValues: { nombre: "", descripcion: "", es_alergeno: false },
  });

  useEffect(() => {
    if (open) {
      reset(
        insumo
          ? {
              nombre: insumo.nombre,
              descripcion: insumo.descripcion ?? "",
              es_alergeno: insumo.es_alergeno,
            }
          : { nombre: "", descripcion: "", es_alergeno: false }
      );
    }
  }, [open, insumo, reset]);

  const onSubmit = async (data: IngredienteFormData) => {
    setSaving(true);
    try {
      await onSave(data);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/[0.07] text-white max-w-md shadow-[0_0_80px_rgba(0,0,0,0.8)] rounded-2xl p-0">
        {/* Header */}
        <div className="relative px-7 pt-7 pb-5 border-b border-white/[0.06]">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-[#FF5A00]/60 to-transparent" />
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#FF5A00]/20 to-[#FF5A00]/5 border border-[#FF5A00]/20 flex items-center justify-center flex-shrink-0">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF5A00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {isEditing ? (
                    <>
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </>
                  ) : (
                    <>
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </>
                  )}
                </svg>
              </div>
              <div>
                <DialogTitle className="text-white/95 text-base font-semibold tracking-tight">
                  {isEditing ? "Editar ingrediente" : "Nuevo ingrediente"}
                </DialogTitle>
                <p className="text-white/30 text-xs mt-0.5 font-mono tracking-wider">
                  {isEditing ? `ID #${insumo?.id}` : "Completá los datos"}
                </p>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="px-7 py-5 space-y-5">
          {/* Nombre */}
          <div className="space-y-2">
            <FieldLabel required>Nombre</FieldLabel>
            <Controller
              name="nombre"
              control={control}
              rules={{ required: "El nombre es obligatorio" }}
              render={({ field }) => (
                <input {...field} placeholder="Ej: Harina 000" className={inputClass} />
              )}
            />
            <FieldError message={errors.nombre?.message} />
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <FieldLabel>Descripción</FieldLabel>
            <Controller
              name="descripcion"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder="Descripción breve del ingrediente (opcional)"
                  rows={3}
                  className={`${inputClass} h-auto resize-none`}
                />
              )}
            />
          </div>

          {/* Es alérgeno */}
          <div className="flex items-center gap-3 py-3 px-4 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <Controller
              name="es_alergeno"
              control={control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  id="es_alergeno"
                  checked={field.value}
                  onChange={field.onChange}
                  className="w-4 h-4 rounded accent-[#FF5A00] cursor-pointer"
                />
              )}
            />
            <label htmlFor="es_alergeno" className="text-sm text-white/70 cursor-pointer select-none">
              Es alérgeno
              <span className="block text-xs text-white/30 font-mono tracking-wider mt-0.5">
                Marcar si puede causar reacciones alérgicas
              </span>
            </label>
          </div>

          {/* Error del servidor */}
          {serverError && (
            <div className="px-4 py-3 rounded-xl text-xs font-mono" style={{ background: "rgba(193,18,31,0.1)", border: "1px solid rgba(193,18,31,0.25)", color: "#e85d74" }}>
              ⚠️ {serverError}
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-white/[0.06] pt-5 -mx-7 px-7 -mb-5 pb-7">
            <DialogFooter className="gap-2 flex-row justify-end">
              <Button
                type="button"
                variant="ghost"
                onClick={onClose}
                disabled={saving}
                className="text-white/40 hover:text-white/70 hover:bg-white/[0.04] transition-all rounded-xl h-10 px-4 text-sm"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                disabled={saving}
                className="relative overflow-hidden bg-gradient-to-r from-[#FF5A00] to-[#e04e00] hover:from-[#ff6a1a] hover:to-[#FF5A00] text-white border-0 rounded-xl h-10 px-6 text-sm font-medium shadow-lg shadow-[#FF5A00]/20 hover:shadow-[#FF5A00]/30 transition-all duration-200 disabled:opacity-50"
              >
                {saving ? "Guardando..." : isEditing ? "Guardar cambios" : "Crear ingrediente"}
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
