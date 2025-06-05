import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reserva } from '../interfaces/reserva.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private apiUrl = "http://localhost:8080/gateway/reserva/api"

  constructor(    
    private readonly http: HttpClient,
  ) { }

    getReserva(): Observable<Reserva[]> {
      return this.http.get<Reserva[]>(`${this.apiUrl}`)
    }
  
    getReservaDetails(id: string): Observable<Reserva> {
      return this.http.get<Reserva>(`${this.apiUrl}`, {
        params: { id }
      })
    }
  
    createReserva(Reserva: Reserva): Observable<Reserva> {
      return this.http.post<Reserva>(`${this.apiUrl}`, Reserva)
    }
  
    getReservaByConductor(id:string): Observable<Reserva[]> {
      return this.http.get<Reserva[]>(`${this.apiUrl}?conductor_id=${id}`)
    }
}
