import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faParking, 
  faCalendarAlt, 
  faUser, 
  faMapMarkerAlt, 
  faCar, 
  faMoneyBillWave, 
  faStar, 
  faClock, 
  faEdit, 
  faTrash 
} from '@fortawesome/free-solid-svg-icons';

import { Parqueadero } from '@/app/interfaces/parqueadero.interface';
import { ParqueaderoService } from '@/app/services/parqueadero.service';
import { ReservasModalComponent } from '../../reservas/reservas-modal/reservas-modal.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-buscar-parqueaderos',
  standalone: true,
   imports: [
    CommonModule, 
    RouterModule, 
    FontAwesomeModule
  ],
  templateUrl: './buscar-parqueaderos.component.html',
})
export class BuscarParqueaderosComponent {
  Parqueaderos: Parqueadero[] = [];
  isLoading = true;
  error: string | null = null;
  
  // Icons
  ParqueaderoIcon = faParking;
  calendarIcon = faCalendarAlt;
  userIcon = faUser;
  locationIcon = faMapMarkerAlt;
  carIcon = faCar;
  moneyIcon = faMoneyBillWave;
  starIcon = faStar;
  clockIcon = faClock;
  editIcon = faEdit;
  deleteIcon = faTrash;
  
  constructor(
    private parqueaderoService: ParqueaderoService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.loadParqueaderos();
  }

  loadParqueaderos(): void {
    this.parqueaderoService.getParqueadero().subscribe({
      next: (data: Parqueadero[]) => {
        console.log(data);
        
        this.Parqueaderos = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'No se pudieron cargar los parqueaderos. Por favor, intenta de nuevo.';
        this.isLoading = false;
        console.error('Error loading Parqueaderos:', err);
      }
    });
  }

  getByCiudad(): void {
    this.isLoading = true;


  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'full':
        return 'bg-red-100 text-red-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  }

  getStatusText(status?: boolean): string {
    if (status === true) return 'Disponible';
    if (status === false) return 'Lleno';

    throw new Error('Estado desconocido');
  }

  editParqueadero(id: string): void {
    console.log('Editing Parqueadero:', id);
    // Implement edit functionality
  }

  deleteParqueadero(id: string): void {
    console.log('Deleting Parqueadero:', id);
    // Implement delete functionality with confirmation dialog
  }

  pa: Parqueadero = {
    calificacion: 2,
    ciudad: "",
    createdAt: new Date(),
    departamento:"",
    direccion: "",
    estado: true,
    horarioAtencion: "",
    idParqueadero: "",
    idPropietarioFk: "",
    nombre: "",
    numeroCeldas: 12,
    tarifaHora: 2,
    tiposVehiculosAceptados: ""
  }
  openReservationModal(parqueadero: Parqueadero): void {
  const dialogRef = this.dialog.open(ReservasModalComponent, {
    width: '500px',
    data: { Parqueadero: parqueadero }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      console.log('Reservation data:', result);
      // Aquí puedes manejar la creación de la reserva
    }
  });
}
}
