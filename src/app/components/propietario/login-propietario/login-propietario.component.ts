import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faCircleExclamation, faClapperboard, faParking, faVideo } from '@fortawesome/free-solid-svg-icons'

import { ToastMessage } from '@/app/interfaces';
import { ToastService } from '@/app/services';
import { CreatedPropietario, Propietario, SignInPropietario, tipoDocumento as tp} from '@/app/interfaces/propietario.interface';
import { PropietarioService } from '@/app/services/propietario.service';


@Component({
  selector: 'app-login-conductor',
  standalone: true,
  imports: [ NgClass, ReactiveFormsModule, FontAwesomeModule, RouterLink ],
  templateUrl: './login-propietario.component.html',
})
export class LoginPropietarioComponent {

  constructor(
    private readonly propietarioService: PropietarioService,
    private readonly toastService: ToastService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.getPreviousRouterInfo()
  }

  handleErrors( message: string, title: string ) {
    this.toastService.showToast({
      type: 'error',
      title,
      message
    })
  }

  //* HANDLE SIGN-IN AND SIGN-UP
  getPreviousRouterInfo() {
    const previousRouterInfo = this.router.lastSuccessfulNavigation?.extras.info
    if ( previousRouterInfo ) {
      const errorInfo = previousRouterInfo as ToastMessage
      this.handleErrors( errorInfo.message, errorInfo.title )
    }
  }

  isSignUp = false;

  toggleState() {
    this.isSignUp = !this.isSignUp;
    this.propietarioForm.markAsUntouched()
  }

  onSubmit() {
    this.propietarioForm.markAllAsTouched()

    const { apellido, contrasena, correo, nombre, numeroDocumento, telefono, tipoDocumento } = this.propietarioForm.value

    if ( this.isSignUp ) {
      if ( this.propietarioForm.valid ) {

        if ( !(apellido && contrasena && correo && nombre && numeroDocumento && telefono && tipoDocumento )) {
          return
        }

        const propietario: Propietario = {
          apellido, 
          contrasena, 
          correo, 
          nombre, 
          numeroDocumento, 
          telefono, 
          tipoDocumento: tipoDocumento as tp
        }

        this.signUp( propietario )

      }
    } else {
      // Verificar que email y password no tengan errores
      if ( !(this.correo?.errors || this.contrasena?.errors) ) {
        if (!(correo && contrasena)) {
          return
        }
        this.signIn(correo, contrasena)
      }

    }
  }

  private signUp (propietario: Propietario) {
    this.propietarioService.signUp(propietario).subscribe({
      next: () => {
        this.toastService.showToast({
          message: "Inicie sesión",
          title: "Propietario creado",
          type: 'success'
        })
        
        this.isSignUp = false;

      },
      error: (error) => {
        this.handleErrors( Array.isArray(error.error.message) ? error.error.message[0] : error.error.message, 'Opps...' )
      }
    })
  }

  private signIn (correo: string, contrasena: string) {
    this.propietarioService.signIn({correo, contrasena} as SignInPropietario).subscribe({
      next: ({nombre, idPropietario}: Propietario) => {
        console.log(idPropietario);
        
        localStorage.setItem('userId', idPropietario!)
        localStorage.setItem('userName', nombre)
        // localStorage.setItem('auth', token)
        this.router.navigateByUrl('/propietario/portal', {
          state: {
            title: `Welcome`,
            type: 'success'
          }
        })
      },
      error: (error) => {
        this.handleErrors( Array.isArray(error.error.message) ? error.error.message[0] : error.error.message, 'Opps...' )
      }
    })
  }

  //* VARIABLES USED IN THE TEMPLATE
  icons = {
    warning: faCircleExclamation,
    logo: faParking
  }

propietarioForm = new FormGroup({
  tipoDocumento: new FormControl('', [Validators.required]),
  nombre: new FormControl('', [Validators.required]),
  apellido: new FormControl('', [Validators.required]),
  correo: new FormControl('', [Validators.required, Validators.email]),
  contrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
  telefono: new FormControl('', [Validators.required]),
  numeroDocumento: new FormControl('', [Validators.required])
});

get tipoDocumento() {
  return this.propietarioForm.get('tipoDocumento');
}

get id_propietario() {
  return this.propietarioForm.get('id_propietario');
}

get nombre() {
  return this.propietarioForm.get('nombre');
}

get apellido() {
  return this.propietarioForm.get('apellido');
}

get correo() {
  return this.propietarioForm.get('correo');
}

get contrasena() {
  return this.propietarioForm.get('contrasena');
}

get telefono() {
  return this.propietarioForm.get('telefono');
}

get createdat() {
  return this.propietarioForm.get('createdat');
}

get numeroDocumento() {
  return this.propietarioForm.get('numeroDocumento');
}


}
