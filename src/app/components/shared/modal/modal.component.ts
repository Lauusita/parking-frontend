import { ModalMessage } from '@/app/interfaces/modal.interface';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCancel, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports:  [MatDialogModule, CommonModule, FontAwesomeModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  constructor(
    public matDialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalMessage,

  ) {}

  icons = {
    delete: faTrash,
    cancel: faCancel
  }

  close() {
    this.matDialogRef.close(false)
  }

  confirmDelete() {
    this.matDialogRef.close(true); 
  }
}


