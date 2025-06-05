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
import { EmptyStateComponent } from '../../shared/empty-state/empty-state';


@Component({
  selector: 'app-mis-parqueaderos',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    FontAwesomeModule,
    EmptyStateComponent
  ],
  templateUrl: './listar-parqueadero.component.html',
})
export class ListarParqueaderoComponent implements OnInit {
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
  
  constructor(private parqueaderoService: ParqueaderoService) { }

  ngOnInit(): void {
    this.loadParqueaderos();
  }

  loadParqueaderos(): void {
    this.isLoading = true;
    let idPropietario = localStorage.getItem("userId")!
    // Use getMockParqueaderos for demo, switch to getMyParqueaderos when API is ready
    this.parqueaderoService.getParqueaderoByPropietario(idPropietario).subscribe({
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
}