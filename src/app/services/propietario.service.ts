import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from './toast.service';
import { CreatedPropietario, Propietario, SignInPropietario } from '../interfaces/propietario.interface';

@Injectable({
  providedIn: 'root'
})
export class PropietarioService {

  private apiUrl = "http://localhost:8080/gateway/propietario/api"

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router,
    private readonly toastService: ToastService
  ) {}

  signUp(propietario: Propietario): Observable<CreatedPropietario> {
    return this.http.post<any>(`${this.apiUrl}`, {
      ...propietario
    })
  }


  signIn({ correo, contrasena }: SignInPropietario): Observable<Propietario> {
    return this.http.post<Propietario>(`${this.apiUrl}`, {
      correo, 
      contrasena
    }, {
      headers: {
        "Content-Type": "application/json"
      }
    })
  }

  getPropietario(): Observable<Propietario[]> {
    return this.http.get<Propietario[]>(`${this.apiUrl}`)
  }

  getPropietarioDetails(id: string): Observable<Propietario> {
    return this.http.get<Propietario>(`${this.apiUrl}`, {
      params: { id }
    })
  }

  createPropietario(Propietario: FormData): Observable<Propietario> {
    return this.http.post<Propietario>(`${this.apiUrl}`, Propietario)
  }

  updatePropietario(id: string, Propietario: Propietario): Observable<Propietario> {
    return this.http.put<Propietario>(`${this.apiUrl}?id=${id}`, {
      ...Propietario
    })
  }

  deletePropietario(id:string) {
    return this.http.delete<string>(`${this.apiUrl}?id=${id}`)
  }
}
