export type tipoDocumento = "CC" | "PASAPORTE" | "NIT";

export interface Conductor {
  idConductor?: string;
  nombre: string;
  apellido: string;
  correo: string;
  contrasena: string;
  telefono: string;
  tipoDocumento: tipoDocumento;
  numeroDocumento: string;
}

export interface LoggedConductor extends Conductor {
  role: "CONDUCTOR" | "ADMIN";
}

export interface CreatedConductor extends Conductor {
  id: string;
  token: string;
}

export interface SignInConductor {
  correo: string;
  contrasena: string;
}

export interface AuthError {
  error: string;
  message: string;
  statusCode: number;
}
