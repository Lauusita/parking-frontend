export interface Reserva {
  tipoVehiculo?: 'CARRO' | 'MOTO' |  'BUS' | 'BICICLETA' | 'CAMION' | any;
  fechaReserva?: string | any;
  horaInicio?: string | any;
  horaFin?: string | any;
  nombreParqueadero: string;
  estado: 'RESERVADA' | 'CANCELADA' | 'COMPLETADA';
  disponible: boolean;
  valorEstimado: number;
  idParqueaderoFk: string;
  idConductorFk: string;
}