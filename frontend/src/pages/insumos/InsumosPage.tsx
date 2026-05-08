import { useState, useMemo, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InsumoStats } from "@/features/insumos/components/InsumoStats";
import { InsumoFilters } from "@/features/insumos/components/InsumoFilters";
import { InsumosTable } from "@/features/insumos/components/InsumosTable";
import { InsumoForm } from "@/features/insumos/components/InsumoForm";
import { InsumoDetailModal } from "@/features/insumos/components/InsumoDetailModal";
import {
  getInsumos,
  createInsumo,
  updateInsumo,
  bajaLogicaInsumo,
} from "@/features/insumos/services/insumosService";
import { BackToDashboard } from "@/components/admin/BackToDashboard";
import type {
  Ingrediente,
  IngredienteFormData,
  IngredienteFiltersState,
} from "@/features/insumos/types/insumo.types";

const EMPTY_FILTERS: IngredienteFiltersState = {
  search: "",
  soloAlergenos: false,
};

// ─── Modal de confirmación de eliminación ─────────────────────────────────────
function ConfirmDeleteModal({
  insumo,
  onConfirm,
  onCancel,
}: {
  insumo: Ingrediente;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75">
      <div
        className="max-w-sm w-full p-8 shadow-2xl"
        style={{ background: "var(--tfs-card-bg)", border: "1px solid var(--tfs-border-mid)" }}
      >
        <div style={{ height: 2, background: "#C1121F", opacity: 0.7, marginBottom: "1.5rem" }} />
        <p className="text-[9px] tracking-[0.45em] uppercase mb-3" style={{ color: "rgba(193,18,31,0.6)", fontFamily: "'Space Mono', monospace" }}>
          Eliminar ingrediente
        </p>
        <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--tfs-text-heading)", letterSpacing: "-0.01em" }}>
          ¿Eliminar este ingrediente?
        </h3>
        <p className="text-sm mb-6" style={{ color: "var(--tfs-text-muted)" }}>
          Se eliminará{" "}
          <span className="font-semibold" style={{ color: "var(--tfs-text-heading)" }}>{insumo.nombre}</span>{" "}
          permanentemente del sistema.
        </p>
        <div className="flex gap-3">
          <Button variant="ghost" className="flex-1" style={{ color: "var(--tfs-text-muted)" }} onClick={onCancel}>
            Cancelar
          </Button>
          <Button className="flex-1 border-0 text-white" style={{ background: "#C1121F" }} onClick={onConfirm}>
            Eliminar
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Página principal ─────────────────────────────────────────────────────────
export function InsumosPage() {
  const [insumos, setInsumos] = useState<Ingrediente[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<IngredienteFiltersState>(EMPTY_FILTERS);
  const [saveError, setSaveError] = useState<string | null>(null);

  const [formOpen, setFormOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const [selectedInsumo, setSelectedInsumo] = useState<Ingrediente | null>(null);
  const [insumoToDelete, setInsumoToDelete] = useState<Ingrediente | null>(null);

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await getInsumos();
      setInsumos(data);
    } catch (error) {
      console.error("Error fetching ingredientes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { refresh(); }, []);

  // ─── Filtrado ───────────────────────────────────────────────────────────────
  const filteredInsumos = useMemo(() => {
    return insumos.filter((i) => {
      const matchSearch =
        filters.search === "" ||
        i.nombre.toLowerCase().includes(filters.search.toLowerCase()) ||
        (i.descripcion ?? "").toLowerCase().includes(filters.search.toLowerCase());
      const matchAlergeno = !filters.soloAlergenos || i.es_alergeno;
      return matchSearch && matchAlergeno;
    });
  }, [insumos, filters]);

  // ─── Handlers ──────────────────────────────────────────────────────────────
  const handleCreate = () => { setSaveError(null); setSelectedInsumo(null); setFormOpen(true); };
  const handleEdit = (i: Ingrediente) => { setSaveError(null); setSelectedInsumo(i); setFormOpen(true); };
  const handleView = (i: Ingrediente) => { setSelectedInsumo(i); setDetailOpen(true); };
  const handleDeleteRequest = (i: Ingrediente) => { setInsumoToDelete(i); setDeleteOpen(true); };

  const handleConfirmDelete = async () => {
    if (insumoToDelete) {
      await bajaLogicaInsumo(insumoToDelete.id);
      await refresh();
      setInsumoToDelete(null);
      setDeleteOpen(false);
    }
  };

  const handleSave = async (data: IngredienteFormData) => {
    setSaveError(null);
    try {
      if (selectedInsumo) {
        await updateInsumo(selectedInsumo.id, data);
      } else {
        await createInsumo(data);
      }
      await refresh();
      setFormOpen(false);
      setSelectedInsumo(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error al guardar el ingrediente";
      setSaveError(msg);
      console.error("handleSave error:", err);
      // NO cerrar el form — mostramos el error al usuario
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6 max-w-6xl mx-auto">
      <BackToDashboard />

      {/* ── Page header ────────────────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <p
            className="text-[9px] tracking-[0.45em] uppercase mb-1"
            style={{ color: "var(--tfs-text-muted)", fontFamily: "'Space Mono', monospace" }}
          >
            Gestión de inventario
          </p>
          <h2
            className="leading-none"
            style={{
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
              color: "var(--tfs-text-heading)",
            }}
          >
            Ingredientes
          </h2>
        </div>

        <Button
          onClick={handleCreate}
          className="gap-2 text-sm h-9 border-0 text-white flex-shrink-0"
          style={{ background: "#FF5A00" }}
        >
          <Plus size={15} />
          Nuevo
        </Button>
      </div>

      {/* ── Stats ──────────────────────────────────────────────────── */}
      <InsumoStats insumos={insumos} />

      {/* ── Filters ────────────────────────────────────────────────── */}
      <div
        className="p-4"
        style={{ background: "var(--tfs-card-bg)", border: "1px solid var(--tfs-border-subtle)" }}
      >
        <InsumoFilters filters={filters} onChange={setFilters} />
      </div>

      {/* ── Table container ────────────────────────────────────────── */}
      <div style={{ background: "var(--tfs-card-bg)", border: "1px solid var(--tfs-border-subtle)" }}>
        {/* Table header bar */}
        <div
          className="flex items-center justify-between px-4 py-3"
          style={{ borderBottom: "1px solid var(--tfs-divider)" }}
        >
          <div className="flex items-center gap-3">
            <span
              className="text-[9px] tracking-[0.45em] uppercase"
              style={{ color: "var(--tfs-text-muted)", fontFamily: "'Space Mono', monospace" }}
            >
              Resultados
            </span>
            <span
              className="text-[9px] font-mono px-2 py-0.5"
              style={{
                background: "rgba(255,90,0,0.1)",
                color: "rgba(255,90,0,0.7)",
                border: "1px solid rgba(255,90,0,0.2)",
              }}
            >
              {filteredInsumos.length}
            </span>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-white/50 font-mono text-xs">
            Cargando ingredientes...
          </div>
        ) : (
          <InsumosTable
            insumos={filteredInsumos}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDeleteRequest}
          />
        )}
      </div>

      {/* ── Modals ─────────────────────────────────────────────────── */}
      <InsumoForm
        open={formOpen}
        insumo={selectedInsumo}
        onClose={() => { setFormOpen(false); setSelectedInsumo(null); setSaveError(null); }}
        onSave={handleSave}
        serverError={saveError}
      />

      <InsumoDetailModal
        open={detailOpen}
        insumo={selectedInsumo}
        onClose={() => { setDetailOpen(false); setSelectedInsumo(null); }}
      />

      {deleteOpen && insumoToDelete && (
        <ConfirmDeleteModal
          insumo={insumoToDelete}
          onConfirm={handleConfirmDelete}
          onCancel={() => { setDeleteOpen(false); setInsumoToDelete(null); }}
        />
      )}
    </div>
  );
}
