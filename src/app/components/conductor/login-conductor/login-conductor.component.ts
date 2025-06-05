import { ToastMessage } from '@/app/interfaces';
import { ToastService } from '@/app/services';
import { ConductorService } from '@/app/services/conductor.service';
import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Conductor, SignInConductor, tipoDocumento as tp} from '@/app/interfaces/conductor.interface';
import { 
  faCircleExclamation, 
  faParking, 
  faUser, 
  faIdCard, 
  faPhone, 
  faEnvelope, 
  faLock, 
  faChevronDown 
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login-conductor',
  standalone: true,
  imports: [ NgClass, ReactiveFormsModule, FontAwesomeModule, RouterLink ],
  templateUrl: './login-conductor.component.html',
})
export class LoginConductorComponent {
  
    constructor(
      private readonly conductorService: ConductorService,
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
      this.conductorForm.markAsUntouched()
    }
  
    onSubmit() {
      this.conductorForm.markAllAsTouched()
  
      const { apellido, contrasena, correo, nombre, numeroDocumento, telefono, tipoDocumento } = this.conductorForm.value
  
      if ( this.isSignUp ) {
        if ( this.conductorForm.valid ) {
  
          if ( !(apellido && contrasena && correo && nombre && numeroDocumento && telefono && tipoDocumento )) {
            return
          }
  
          const conductor: Conductor = {
            apellido, 
            contrasena, 
            correo, 
            nombre, 
            numeroDocumento, 
            telefono, 
            tipoDocumento: tipoDocumento as tp
          }
  
          this.signUp( conductor )
  
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
  
    private signUp (conductor: Conductor) {
      this.conductorService.signUp(conductor).subscribe({
        next: (conductor: Conductor) => {
          this.isSignUp = false;
        },
        error: (error) => {
          this.handleErrors( Array.isArray(error.error.message) ? error.error.message[0] : error.error.message, 'Opps...' )
        }
      })
    }
  
    private signIn (correo: string, contrasena: string) {
      this.conductorService.signIn({correo, contrasena} as SignInConductor).subscribe({
        next: ({nombre, idConductor}: Conductor) => {
          
          localStorage.setItem('userId', idConductor!)
          localStorage.setItem('userName', nombre)
          // localStorage.setItem('auth', token)
          this.router.navigateByUrl('/conductor/portal', {
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
    faUser = faUser;
    faIdCard = faIdCard;
    faPhone = faPhone;
    faEnvelope = faEnvelope;
    faLock = faLock;
    faChevronDown = faChevronDown;
    faWarning = faCircleExclamation;
    faLogo = faParking;
  
  conductorForm = new FormGroup({
    tipoDocumento: new FormControl('', [Validators.required]),
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl('', [Validators.required, Validators.minLength(6)]),
    telefono: new FormControl('', [Validators.required]),
    numeroDocumento: new FormControl('', [Validators.required])
  });
  
  get tipoDocumento() {
    return this.conductorForm.get('tipoDocumento');
  }
  
  get id_Conductor() {
    return this.conductorForm.get('id_conductor');
  }
  
  get nombre() {
    return this.conductorForm.get('nombre');
  }
  
  get apellido() {
    return this.conductorForm.get('apellido');
  }
  
  get correo() {
    return this.conductorForm.get('correo');
  }
  
  get contrasena() {
    return this.conductorForm.get('contrasena');
  }
  
  get telefono() {
    return this.conductorForm.get('telefono');
  }
  
  get createdat() {
    return this.conductorForm.get('createdat');
  }
  
  get numeroDocumento() {
    return this.conductorForm.get('numeroDocumento');
  }
  
  
}
