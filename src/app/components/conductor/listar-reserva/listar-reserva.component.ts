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
  faTrash, 
  faCheck
} from '@fortawesome/free-solid-svg-icons';

import { Reserva } from '@/app/interfaces/reserva.interface';
import { ReservasService } from '@/app/services/reservas.service';
import { EmptyStateComponent } from '../../shared/empty-state/empty-state';
import { ToastService } from '@/app/services';


@Component({
  selector: 'app-mis-Reservas',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FontAwesomeModule,
    EmptyStateComponent
  ],
  templateUrl: './listar-reserva.component.html',
})
export class ListarReservaComponent implements OnInit {
  Reservas: Reserva[] = [];
  isLoading = true;
  error: string | null = null;
  
  // Icons
  ReservaIcon = faParking;
  calendarIcon = faCalendarAlt;
  userIcon = faUser;
  locationIcon = faMapMarkerAlt;
  carIcon = faCar;
  moneyIcon = faMoneyBillWave;
  starIcon = faStar;
  clockIcon = faClock;
  editIcon = faEdit;
  deleteIcon = faTrash;
  checkIcon = faCheck;
  
  constructor(
    private reservaService: ReservasService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.loadReservas();
  }

  handleErrors( message: string, title: string ) {
      this.toastService.showToast({
        type: 'error',
        title,
        message
      })
    }
    
  loadReservas(): void {
    this.isLoading = true;
    let idConductor = localStorage.getItem("userId")!
    
    this.reservaService.getReservaByConductor(idConductor).subscribe({
      next: (data: Reserva[]) => {
        console.log(data);
        
        this.Reservas = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.handleErrors( Array.isArray(error.error.message) ? error.error.message[0] : error.error.message, 'Opps...' )
      }
    });
  }

  getStatusText(status?: boolean): string {
    if (status === true) return 'Disponible';
    if (status === false) return 'Lleno';

    throw new Error('Estado desconocido');
  }
}