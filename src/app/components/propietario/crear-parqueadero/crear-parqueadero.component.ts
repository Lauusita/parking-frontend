import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { ToastService } from '@/app/services';
import { ToastMessage } from '@/app/interfaces';
import { ParqueaderoService } from '@/app/services/parqueadero.service';
import { Parqueadero } from '@/app/interfaces/parqueadero.interface';

@Component({
  selector: 'app-crear-parqueadero',
  standalone: true,
  imports: [ReactiveFormsModule, FontAwesomeModule, FormsModule],
  templateUrl: './crear-parqueadero.component.html',
})
export class CrearParqueaderoComponent implements OnInit {

  constructor(
    private readonly toastService: ToastService,
    private readonly parqueaderoService: ParqueaderoService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getPreviousRouterInfo();
  }

  saveIcon = faCheck;

  parqueaderoForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    ciudad: new FormControl('', [Validators.required]),
    departamento: new FormControl('', [Validators.required]),
    numeroCeldas: new FormControl(0, [Validators.required, Validators.min(1)]),
    tarifaHora: new FormControl(0, [Validators.required, Validators.min(0)]),
    horarioAtencion: new FormControl('', [Validators.required]),
    tiposVehiculosAceptados: new FormControl('CARRO', [Validators.required])
  });

  get nombre() { return this.parqueaderoForm.get('nombre'); }
  get direccion() { return this.parqueaderoForm.get('direccion'); }
  get ciudad() { return this.parqueaderoForm.get('ciudad'); }
  get departamento() { return this.parqueaderoForm.get('departamento'); }
  get calificacion() { return this.parqueaderoForm.get('calificacion'); }
  get numeroCeldas() { return this.parqueaderoForm.get('numeroCeldas'); }
  get tarifaHora() { return this.parqueaderoForm.get('tarifaHora'); }
  get horarioAtencion() { return this.parqueaderoForm.get('horarioAtencion'); }
  get estado() { return this.parqueaderoForm.get('estado'); }
  get tiposVehiculosAceptados() { return this.parqueaderoForm.get('tiposVehiculosAceptados'); }
  get idPropietarioFk() { return this.parqueaderoForm.get('idPropietarioFk'); }

  handleErrors(message: string, title: string) {
    this.toastService.showToast({ type: 'error', title, message });
  }

  getPreviousRouterInfo() {
    const previousRouterInfo = this.router.lastSuccessfulNavigation?.extras.info;
    if (previousRouterInfo) {
      const errorInfo = previousRouterInfo as ToastMessage;
      this.handleErrors(errorInfo.message, errorInfo.title);
    }
  }

  cancelarRegistro() {
    this.router.navigate(['/propietario/portal']);
  }

  guardarParqueadero() {
    this.parqueaderoForm.markAllAsTouched();

    if (this.parqueaderoForm.valid) {
      const {  ciudad,departamento,direccion,horarioAtencion, nombre,numeroCeldas,tarifaHora, tiposVehiculosAceptados } = this.parqueaderoForm.value; 

      if (!( ciudad && departamento && direccion && horarioAtencion && nombre && numeroCeldas && tarifaHora && tiposVehiculosAceptados)) {
        return;
      }

      const nuevoParqueadero: Parqueadero = {
        ciudad,
        departamento,
        direccion,
        horarioAtencion,
        nombre,
        numeroCeldas,
        tarifaHora, 
        tiposVehiculosAceptados
      }

      const idPropietarioFk = localStorage.getItem("userId");
      const calificacion = 5;
      const estado = true;

      this.parqueaderoService.createParqueadero({ ...nuevoParqueadero, idPropietarioFk, calificacion, estado}).subscribe({
        next: () => {
          this.toastService.showToast({
            message: "Parqueadero creado",
            title: "CREACIÓN",
            type: "success"
          })
          this.router.navigate(['/propietario/portal'], {
            state: {
              title: 'Parqueadero creado exitosamente',
              type: 'success'
            }
          });
        },
        error: (error) => {
          const msg = Array.isArray(error.error.message) ? error.error.message[0] : error.error.message;
          this.handleErrors(msg, 'Error al crear parqueadero');
        }
      });
    }
  }
}
