import { Routes } from '@angular/router';
import { authGuard } from './guards';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SelectComponent } from './components/select/select.component';
import { LoginPropietarioComponent } from './components/propietario/login-propietario/login-propietario.component';
import { PortalPropietarioComponent } from './components/propietario/portal-propietario/portal-propietario.component';
import { PerfilPropietarioComponent } from './components/propietario/perfil-propietario/perfil-propietario.component';
import { LoginConductorComponent } from './components/conductor/login-conductor/login-conductor.component';
import { PerfilConductorComponent } from './components/conductor/perfil-conductor/perfil-conductor.component';
import { PortalConductorComponent } from './components/conductor/portal-conductor/portal-conductor.component';
import { CrearParqueaderoComponent } from './components/propietario/crear-parqueadero/crear-parqueadero.component';
import { ListarParqueaderoComponent } from './components/propietario/listar-parqueadero/listar-parqueadero.component';
import { BuscarParqueaderosComponent } from './components/conductor/buscar-parqueaderos/buscar-parqueaderos.component';
import { ListarReservaComponent } from './components/conductor/listar-reserva/listar-reserva.component';

export const routes: Routes = [
  {
    path: "",
    component: MainPageComponent
  },
  {
    path: 'select',
    component: SelectComponent
  },
  {
    path: 'create-account',
    children: [
      {
        path: 'propietario',
        component: LoginPropietarioComponent
      },
      {
        path: 'conductor',
        component: LoginConductorComponent
      },
    ]
  },
  {
    path: 'propietario',
    children: [
      {
        path: '',
        redirectTo: "portal",
        pathMatch: "full"
      },
      {
        path: 'portal',
        component: PortalPropietarioComponent,
      },
      {
        path: 'perfil',
        component: PerfilPropietarioComponent
      },
      {
        path: 'crear-parqueadero',
        component: CrearParqueaderoComponent
      },
      {
        path: 'listar',
        component: ListarParqueaderoComponent
      }
    ]
  },
  {
    path: 'conductor',
    children: [
      {
        path: '',
        redirectTo: "portal",
        pathMatch: "full"
      },
      {
        path: 'portal',
        component: PortalConductorComponent,
      },
      {
        path: 'perfil',
        component: PerfilConductorComponent
      }, 
      {
        path: 'parqueaderos',
        component: BuscarParqueaderosComponent
      },
      {
        path: 'listar',
        component: ListarReservaComponent
      }
    ]
  },
  {
    path: "",
    component: NotFoundComponent
  }
];