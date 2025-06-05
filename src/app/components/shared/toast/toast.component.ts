import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../../services/toast.service';
import { ToastMessage } from '../../../interfaces';
import { NgClass } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'
import { faTriangleExclamation, faCircleInfo, faCheck, faBug } from '@fortawesome/free-solid-svg-icons'


@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [ NgClass, FontAwesomeModule ],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit {
  toast: ToastMessage | null = null
  icons = {
    warning: faTriangleExclamation,
    info: faCircleInfo,
    success: faCheck,
    error: faBug
  }

  constructor(
    private readonly toastService: ToastService
  ) {}

  ngOnInit() {
    this.toastService.toast.subscribe((toast) => {
      this.toast = toast
    })
  }

  // closeToast() {
  //   this.toastService.clearToast( )
  // }

}
