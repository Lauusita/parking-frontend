import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Parqueadero } from '@/app/interfaces/parqueadero.interface';
import { Reserva } from '@/app/interfaces/reserva.interface';
import { ReservasService } from '@/app/services/reservas.service';
import { ToastService } from '@/app/services';

@Component({
  selector: 'app-reservation-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDialogModule],
  templateUrl: './reservas-modal.component.html'
})
export class ReservasModalComponent {
  reservaForm = new FormGroup({
    tipoVehiculo: new FormControl('', [Validators.required]), // Enum: tipo_vehiculos_aceptados
    fechaReserva: new FormControl('', [Validators.required]), // Date
    horaInicio: new FormControl('', [Validators.required]),
    horaFin: new FormControl('', [Validators.required]),
});

  constructor(
    public dialogRef: MatDialogRef<ReservasModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { Parqueadero: Parqueadero },
    private readonly reservaServicio: ReservasService,
    private readonly toastService: ToastService,

  ) {
    this.reservaForm = new FormGroup({
      tipoVehiculo: new FormControl('CARRO', [Validators.required]),
      fechaReserva: new FormControl('', [Validators.required]),
      horaInicio: new FormControl('', [Validators.required]),
      horaFin: new FormControl('', [Validators.required])
    });
  }

  handleErrors( message: string, title: string ) {
      this.toastService.showToast({
        type: 'error',
        title,
        message
      })
  }

  onSubmit() {
    const idConductor = localStorage.getItem("userId")!;

    if (this.reservaForm.valid) {
      let { horaFin, horaInicio } = this.reservaForm.value

      horaFin += ":00"
      horaInicio += ":00";

      const reserva: Reserva = {
        ...this.reservaForm.value,
        nombreParqueadero: this.data.Parqueadero.nombre,
        estado: 'RESERVADA',
        disponible: true,
        valorEstimado: this.data.Parqueadero.tarifaHora,
        idParqueaderoFk: this.data.Parqueadero.idParqueadero,
        idConductorFk: idConductor,
        horaFin,
        horaInicio
      };
      console.log("holalala");
      
      this.reservaServicio.createReserva(reserva).subscribe({
        next: (r: Reserva) => {
          this.toastService.showToast({
            message: "Reserva creada exitosamente",
            title: "SUCCESS",
            type: "success"
          })
        }, error: (error) => {
          this.handleErrors( Array.isArray(error.error.message) ? error.error.message[0] : error.error.message, 'Opps...' )
        },
      })
      this.dialogRef.close(reserva);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  get idReserva() {
  return this.reservaForm.get('idReserva');
}

get nombreParqueadero() {
  return this.reservaForm.get('nombreParqueadero');
}

get tipoVehiculo() {
  return this.reservaForm.get('tipoVehiculo');
}

get fechaReserva() {
  return this.reservaForm.get('fechaReserva');
}

get horaInicio() {
  return this.reservaForm.get('horaInicio');
}

get horaFin() {
  return this.reservaForm.get('horaFin');
}

get estado() {
  return this.reservaForm.get('estado');
}

get disponible() {
  return this.reservaForm.get('disponible');
}

get valorEstimado() {
  return this.reservaForm.get('valorEstimado');
}

get createdAt() {
  return this.reservaForm.get('createdAt');
}

get idConductorFk() {
  return this.reservaForm.get('idConductorFk');
}

get idParqueaderoFk() {
  return this.reservaForm.get('idParqueaderoFk');
}

}