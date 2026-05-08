export interface UsuarioResponse {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  celular: string | null;
  is_active: boolean;
  created_at: string;
}

export interface UsuarioDetailResponse extends UsuarioResponse {
  roles: string[];
}

export interface UsuarioUpdateRequest {
  nombre?: string;
  apellido?: string;
  celular?: string;
}
