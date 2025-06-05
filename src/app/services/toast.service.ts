import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastMessage } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private toastSubject = new BehaviorSubject<ToastMessage | null>(null)
  toast = this.toastSubject.asObservable()

  showToast(toast: ToastMessage) {
    this.toastSubject.next(toast)
    setTimeout(() => {
      toast.end = true
      this.clearToast( toast )
    }, toast.duration ?? 2500)
  }

  clearToast ( toast: ToastMessage) {
    setTimeout(() => {
      this.toastSubject.next(null)
      toast.end = false
    }, 300)
  }


}
