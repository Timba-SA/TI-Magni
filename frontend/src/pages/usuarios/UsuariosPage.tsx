import { useState, useEffect, useCallback } from "react";
import { Users, ShieldCheck, UserCheck, UserX } from "lucide-react";
import type { UsuarioDetailResponse } from "@/features/users/types/user.types";
import { getUsuarios, toggleActive, updateUserRoles } from "@/features/users/services/usersService";
import { BackToDashboard } from "@/components/admin/BackToDashboard";
import { useAuth } from "@/hooks/useAuth";

// ── Helpers ────────────────────────────────────────────────────────────────────

function SectionLabel({ label, code }: { label: string; code: string }) {
  return (
    <div className="flex items-center gap-4 mb-5">
      <span
        className="text-[8px] tracking-[0.5em] uppercase flex-shrink-0"
        style={{ color: "rgba(255,90,0,0.55)", fontFamily: "'Space Mono', monospace" }}
      >
        {code} — {label}
      </span>
      <div style={{ flex: 1, height: 1, background: "var(--tfs-divider)" }} />
    </div>
  );
}

const ROL_STYLES: Record<string, { color: string; bg: string; border: string }> = {
  ADMIN:     { color: "#FF5A00",               bg: "rgba(255,90,0,0.1)",     border: "rgba(255,90,0,0.25)" },
  ENCARGADO: { color: "var(--tfs-text-muted)", bg: "var(--tfs-card-bg)",     border: "var(--tfs-border-mid)" },
  CLIENTE:   { color: "rgba(52,211,153,0.85)", bg: "rgba(52,211,153,0.08)", border: "rgba(52,211,153,0.2)" },
};

// ── Página principal ───────────────────────────────────────────────────────────

export function UsuariosPage() {
  const { user: currentUser } = useAuth();
  const [usuarios, setUsuarios] = useState<UsuarioDetailResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toggling, setToggling] = useState<number | null>(null);
  const [updatingRole, setUpdatingRole] = useState<number | null>(null);

  const fetchUsuarios = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUsuarios();
      setUsuarios(data);
    } catch {
      setError("No se pudieron cargar los usuarios.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchUsuarios(); }, [fetchUsuarios]);

  const handleToggle = async (id: number) => {
    setToggling(id);
    try {
      const updated = await toggleActive(id);
      setUsuarios((prev) =>
        prev.map((u) => (u.id === updated.id ? { ...u, ...updated } : u))
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al cambiar el estado del usuario.");
    } finally {
      setToggling(null);
    }
  };

  const handleRoleChange = async (id: number, currentRoles: string[]) => {
    setUpdatingRole(id);
    try {
      // Si ya tiene ADMIN lo quitamos (queda CLIENT), si no lo agregamos
      const hasAdmin = currentRoles.includes("ADMIN");
      const newRoles = hasAdmin ? ["CLIENT"] : ["ADMIN", "CLIENT"];
      const updated = await updateUserRoles(id, newRoles);
      setUsuarios((prev) =>
        prev.map((u) => (u.id === updated.id ? updated : u))
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Error al cambiar los roles.");
    } finally {
      setUpdatingRole(null);
    }
  };

  const activos = usuarios.filter((u) => u.is_active).length;
  const suspendidos = usuarios.filter((u) => !u.is_active).length;

  return (
    <div
      className="min-h-screen p-8"
      style={{ background: "var(--tfs-bg-primary)", color: "var(--tfs-text-primary)" }}
    >
      <BackToDashboard />

      {/* Header */}
      <div className="max-w-5xl mx-auto mt-6 mb-10">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Users size={18} style={{ color: "#FF5A00" }} />
              <span
                className="text-[9px] tracking-[0.5em] uppercase"
                style={{ color: "rgba(255,90,0,0.6)", fontFamily: "'Space Mono', monospace" }}
              >
                Panel Admin
              </span>
            </div>
            <h1
              className="text-3xl font-bold tracking-tight"
              style={{ color: "var(--tfs-text-heading)", fontFamily: "'Playfair Display', serif" }}
            >
              Gestión de Usuarios
            </h1>
            <p className="text-sm mt-1" style={{ color: "var(--tfs-text-muted)" }}>
              Administrá el acceso y el estado de los usuarios del sistema.
            </p>
          </div>

          {/* Stats */}
          {!loading && (
            <div className="flex gap-4">
              <div
                className="text-center px-5 py-3 rounded"
                style={{ background: "var(--tfs-card-bg)", border: "1px solid var(--tfs-border-subtle)" }}
              >
                <p className="text-xl font-bold" style={{ color: "rgba(52,211,153,0.9)" }}>{activos}</p>
                <p className="text-[9px] tracking-widest uppercase" style={{ color: "var(--tfs-text-subtle)" }}>Activos</p>
              </div>
              <div
                className="text-center px-5 py-3 rounded"
                style={{ background: "var(--tfs-card-bg)", border: "1px solid var(--tfs-border-subtle)" }}
              >
                <p className="text-xl font-bold" style={{ color: "rgba(239,68,68,0.9)" }}>{suspendidos}</p>
                <p className="text-[9px] tracking-widest uppercase" style={{ color: "var(--tfs-text-subtle)" }}>Suspendidos</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-5xl mx-auto">
        <SectionLabel label="Listado" code="01" />

        {loading && (
          <div className="text-center py-16" style={{ color: "var(--tfs-text-subtle)" }}>
            <p className="text-[10px] tracking-[0.4em] uppercase" style={{ fontFamily: "'Space Mono', monospace" }}>
              Cargando usuarios…
            </p>
          </div>
        )}

        {error && (
          <div
            className="rounded px-4 py-3 text-sm mb-6"
            style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", color: "rgb(239,68,68)" }}
          >
            {error}
          </div>
        )}

        {!loading && !error && (
          <div
            className="rounded overflow-hidden"
            style={{ border: "1px solid var(--tfs-border-subtle)" }}
          >
            {/* Table header */}
            <div
              className="grid grid-cols-[3rem_1fr_1fr_6rem_8rem_8rem] px-5 py-3 text-[9px] tracking-[0.4em] uppercase"
              style={{
                background: "var(--tfs-card-bg)",
                borderBottom: "1px solid var(--tfs-border-subtle)",
                color: "var(--tfs-text-subtle)",
                fontFamily: "'Space Mono', monospace",
              }}
            >
              <span>#</span>
              <span>Usuario</span>
              <span>Email</span>
              <span className="text-center">Rol</span>
              <span className="text-center">Estado</span>
              <span className="text-center">Acción</span>
            </div>

            {/* Rows */}
            {usuarios.length === 0 ? (
              <div className="text-center py-12" style={{ color: "var(--tfs-text-subtle)" }}>
                <p className="text-[10px] tracking-[0.3em] uppercase" style={{ fontFamily: "'Space Mono', monospace" }}>
                  No hay usuarios registrados
                </p>
              </div>
            ) : (
              usuarios.map((u, i) => (
                <div
                  key={u.id}
                  className="grid grid-cols-[3rem_1fr_1fr_6rem_8rem_8rem] px-5 py-4 items-center"
                  style={{
                    borderBottom: i < usuarios.length - 1 ? "1px solid var(--tfs-border-subtle)" : "none",
                    background: "var(--tfs-bg-primary)",
                    transition: "background 0.15s",
                    opacity: u.is_active ? 1 : 0.6,
                  }}
                >
                  {/* ID */}
                  <span className="text-xs font-mono" style={{ color: "var(--tfs-text-subtle)" }}>
                    {u.id}
                  </span>

                  {/* Nombre */}
                  <div className="flex items-center gap-2">
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                      style={{ background: "rgba(255,90,0,0.12)", color: "#FF5A00" }}
                    >
                      {u.nombre[0]}{u.apellido[0]}
                    </div>
                    <span className="text-sm font-medium" style={{ color: "var(--tfs-text-heading)" }}>
                      {u.nombre} {u.apellido}
                    </span>
                  </div>

                  {/* Email */}
                  <span className="text-xs font-mono truncate" style={{ color: "var(--tfs-text-muted)" }}>
                    {u.email}
                  </span>

                  {/* Rol toggle */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleRoleChange(u.id, u.roles || [])}
                      disabled={updatingRole === u.id || u.id === currentUser?.id}
                      className="text-[9px] tracking-widest uppercase px-2 py-1 rounded-sm transition-all"
                      style={
                        (u.roles || []).includes("ADMIN")
                          ? { color: "#FF5A00", background: "rgba(255,90,0,0.1)", border: "1px solid rgba(255,90,0,0.25)", cursor: u.id === currentUser?.id ? "not-allowed" : "pointer", opacity: updatingRole === u.id || u.id === currentUser?.id ? 0.5 : 1 }
                          : { color: "var(--tfs-text-muted)", background: "var(--tfs-card-bg)", border: "1px solid var(--tfs-border-mid)", cursor: u.id === currentUser?.id ? "not-allowed" : "pointer", opacity: updatingRole === u.id || u.id === currentUser?.id ? 0.5 : 1 }
                      }
                      title={u.id === currentUser?.id ? "No puedes cambiar tu propio rol" : "Alternar ADMIN"}
                    >
                      {(u.roles || []).includes("ADMIN") ? "ADMIN" : "CLIENT"}
                    </button>
                  </div>

                  {/* Estado badge */}
                  <div className="flex justify-center">
                    <span
                      className="text-[9px] tracking-widest uppercase px-2 py-1 rounded-sm"
                      style={
                        u.is_active
                          ? { color: "rgba(52,211,153,0.9)", background: "rgba(52,211,153,0.08)", border: "1px solid rgba(52,211,153,0.2)" }
                          : { color: "rgba(239,68,68,0.8)", background: "rgba(239,68,68,0.07)", border: "1px solid rgba(239,68,68,0.18)" }
                      }
                    >
                      {u.is_active ? "Activo" : "Suspendido"}
                    </span>
                  </div>

                  {/* Toggle button */}
                  <div className="flex justify-center">
                    <button
                      onClick={() => handleToggle(u.id)}
                      disabled={toggling === u.id}
                      className="flex items-center gap-1.5 text-[9px] tracking-widest uppercase px-3 py-1.5 rounded transition-all"
                      style={{
                        fontFamily: "'Space Mono', monospace",
                        border: "1px solid var(--tfs-border-mid)",
                        background: "var(--tfs-card-bg)",
                        color: "var(--tfs-text-muted)",
                        cursor: toggling === u.id ? "not-allowed" : "pointer",
                        opacity: toggling === u.id ? 0.5 : 1,
                      }}
                      title={u.is_active ? "Suspender usuario" : "Activar usuario"}
                    >
                      {u.is_active
                        ? <><UserX size={11} /> Suspender</>
                        : <><UserCheck size={11} /> Activar</>
                      }
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Roles legend */}
        {!loading && usuarios.length > 0 && (
          <div className="mt-6 flex items-center gap-4">
            <span className="text-[9px] tracking-[0.3em] uppercase" style={{ color: "var(--tfs-text-subtle)", fontFamily: "'Space Mono', monospace" }}>
              Roles
            </span>
            {Object.entries(ROL_STYLES).map(([rol, styles]) => (
              <span
                key={rol}
                className="text-[9px] tracking-[0.2em] uppercase px-2 py-0.5 rounded-sm"
                style={{ color: styles.color, background: styles.bg, border: `1px solid ${styles.border}` }}
              >
                {rol}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
