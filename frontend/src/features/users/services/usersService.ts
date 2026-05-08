import { fetchApi } from "@/shared/api/apiClient";
import type {
  UsuarioDetailResponse,
  UsuarioResponse,
  UsuarioUpdateRequest,
} from "../types/user.types";

/** Perfil propio del usuario autenticado (incluye roles). */
export async function getMe(): Promise<UsuarioDetailResponse> {
  return fetchApi<UsuarioDetailResponse>("/usuarios/me");
}

/** Actualiza el perfil propio (nombre, apellido, celular). */
export async function updateMe(
  data: UsuarioUpdateRequest
): Promise<UsuarioResponse> {
  return fetchApi<UsuarioResponse>("/usuarios/me", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

/** Lista todos los usuarios. Solo ADMIN. */
export async function getUsuarios(): Promise<UsuarioDetailResponse[]> {
  return fetchApi<UsuarioDetailResponse[]>("/usuarios/");
}

/** Alterna el estado activo/suspendido de un usuario. Solo ADMIN. */
export async function toggleActive(id: number): Promise<UsuarioResponse> {
  return fetchApi<UsuarioResponse>(`/usuarios/${id}/toggle-active`, {
    method: "PATCH",
  });
}

/** Actualiza los roles de un usuario. Solo ADMIN. */
export async function updateUserRoles(id: number, roles: string[]): Promise<UsuarioDetailResponse> {
  return fetchApi<UsuarioDetailResponse>(`/usuarios/${id}/roles`, {
    method: "PATCH",
    body: JSON.stringify({ roles }),
  });
}
