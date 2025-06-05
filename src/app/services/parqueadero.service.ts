import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Parqueadero } from '../interfaces/parqueadero.interface';

@Injectable({
  providedIn: 'root'
})
export class ParqueaderoService {

  private apiUrl = "http://localhost:8080/gateway/parqueadero/api"

  constructor(    
    private readonly http: HttpClient
  ) { }

  getParqueadero(): Observable<Parqueadero[]> {
    return this.http.get<Parqueadero[]>(`${this.apiUrl}`)
  }
  
  getParqueaderoByPropietario(id_propietario: string): Observable<Parqueadero[]> {
    return this.http.get<Parqueadero[]>(`${this.apiUrl}?id_propietario=${id_propietario}`)
  }

  getParqueaderoByCiudad(ciudad: string): Observable<Parqueadero[]> {
    return this.http.get<Parqueadero[]>(`${this.apiUrl}?ciudad=${ciudad}`)
  }


  getParqueaderoDetails(id: string): Observable<Parqueadero> {
    return this.http.get<Parqueadero>(`${this.apiUrl}`, {
      params: { id }
    })
  }

  createParqueadero(Parqueadero: Parqueadero): Observable<Parqueadero> {
    return this.http.post<Parqueadero>(`${this.apiUrl}`, Parqueadero)
  }

  updateParqueadero(id: string, Parqueadero: Parqueadero): Observable<Parqueadero> {
    return this.http.put<Parqueadero>(`${this.apiUrl}?id=${id}`, {
      ...Parqueadero
    })
  }

  deleteParqueadero(id:string) {
    return this.http.delete<string>(`${this.apiUrl}?id=${id}`)
  }
}
