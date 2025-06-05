export interface Parqueadero {
  idParqueadero?: string | any;
  nombre?: string| any;
  direccion?: string| any;
  ciudad?: string| any;
  calificacion?: number| any;
  departamento?: string| any;
  numeroCeldas?: number| any;
  tarifaHora?: number| any;
  horarioAtencion?: string| any;
  estado?: boolean| any;
  tiposVehiculosAceptados?: string| any;
  createdAt?: Date| any;
  idPropietarioFk?: string | any; 
}
