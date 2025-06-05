export type tipoDocumento = "CC" | "Pasaporte" | "NIT";

export interface Propietario {
  idPropietario?: string;
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  telefono: string;
  tipoDocumento: tipoDocumento;
  numeroDocumento: string;
}

export interface LoggedPropietario extends Propietario {
  role: "PROPIETARIO" | "ADMIN";
}

export interface CreatedPropietario extends Propietario {
  id: string;
  token: string;
}

export interface SignInPropietario {
  correo: string;
  contrasena: string;
}

export interface AuthError {
  error: string;
  message: string;
  statusCode: number;
}
