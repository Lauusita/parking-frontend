import { Component, OnInit } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { faUser, faEdit, faTrash, faCheck, faTimes, faPhone, faIdCard, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Conductor, tipoDocumento } from '@/app/interfaces/conductor.interface';
import { ConductorService } from '@/app/services/conductor.service';
import { ToastService } from '@/app/services';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalComponent } from '../../shared/modal/modal.component';

@Component({
  selector: 'app-perfil-conductor',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule, FormsModule, MatDialogModule],
  templateUrl: './perfil-conductor.component.html',
})
export class PerfilConductorComponent implements OnInit {
  cond: Conductor = {
    nombre: "",
    apellido: "",
    correo: "",
    contrasena: "",
    telefono: "",
    tipoDocumento: "CC",
    numeroDocumento: ""
  };

  id = "";

  userIcon = faUser;
  editIcon = faEdit;
  deleteIcon = faTrash;
  saveIcon = faCheck;
  cancelIcon = faTimes;
  phoneIcon = faPhone;
  idCardIcon = faIdCard;
  emailIcon = faEnvelope;

  isEditing = false;

  constructor(
    private readonly conductorService: ConductorService,
    private readonly toastService: ToastService,
    private readonly router: Router,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.id = localStorage.getItem("userId")?.toString()!
    this.conductorService.getConductorDetails(this.id).subscribe({
      next: ({ nombre, apellido, contrasena, correo, numeroDocumento, telefono, tipoDocumento }: Conductor) => {

        this.cond = {
          nombre, apellido, contrasena, correo, numeroDocumento, telefono, tipoDocumento
        }
      }
    });
  }

  handleErrors(message: string, title: string) {
    this.toastService.showToast({
      type: 'error',
      title,
      message
    })
  }

  editedUser: Conductor = { ...this.cond };

  toggleEdit() {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.editedUser = { ...this.cond };
    }
  }

  edit() {
    this.conductorService.updateConductor(this.id, this.editedUser).subscribe({
      next: () => {
        new ToastService().showToast({
          message: "Actualizado",
          title: "yupi",
          type: "success",
          duration: 2
        })
      },
      error: (error) => {
        this.handleErrors(Array.isArray(error.error.message) ? error.error.message[0] : error.error.message, 'Opps...')
      }
    })
  }

  delete() {
    this.conductorService.deleteConductor(this.id).subscribe({
      next: () => {
        new ToastService().showToast({
          message: "Actualizado",
          title: "yupi",
          type: "success",
          duration: 2
        })
        
        localStorage.clear()
        this.router.navigateByUrl("/create-account/conductor")
      },
      error: (error) => {
        this.handleErrors( Array.isArray(error.error.message) ? error.error.message[0] : error.error.message, 'Opps...' )
      }
    })
  }

  openDeleteModal() {
      const dialog = this.dialog.open(ModalComponent, {
        width: "300px",
        data: {
          title: `You are about to delete your account!`,
          message: "This action will delete your awesome account! Are you sure?",
          type: "delete"
        }
      })
  
      dialog.afterClosed().subscribe((deleted: boolean) => {
        if (!deleted) return
          this.delete()
      })
    }
}
