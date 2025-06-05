import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Conductor, CreatedConductor, SignInConductor } from '../interfaces/conductor.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConductorService {

  private apiUrl = "http://localhost:8080/gateway/conductor/api"

  constructor(    
    private readonly http: HttpClient
  ) {}

  signUp(Conductor: Conductor): Observable<CreatedConductor> {
      return this.http.post<any>(`${this.apiUrl}`, {
        ...Conductor
      })
    }
    
  signIn({ correo, contrasena }: SignInConductor): Observable<Conductor> {
    return this.http.post<Conductor>(`${this.apiUrl}`, {
      correo, 
      contrasena
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
  }

  getConductor(): Observable<Conductor[]> {
    return this.http.get<Conductor[]>(`${this.apiUrl}`)
  }

  getConductorDetails(id: string): Observable<Conductor> {
    return this.http.get<Conductor>(`${this.apiUrl}`, {
      params: { id }
    })
  }

  createConductor(Conductor: FormData): Observable<Conductor> {
    return this.http.post<Conductor>(`${this.apiUrl}`, Conductor)
  }

  updateConductor(id: string, Conductor: Conductor): Observable<Conductor> {
    return this.http.put<Conductor>(`${this.apiUrl}?id=${id}`, {
      ...Conductor
    })
  }

  deleteConductor(id:string) {
    return this.http.delete<string>(`${this.apiUrl}?id=${id}`)
  }
}
