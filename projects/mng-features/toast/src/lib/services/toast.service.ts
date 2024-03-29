import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subject } from 'rxjs';
import { ToastMessage } from '../models/toast-message.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastMessage: Subject<ToastMessage> = new Subject();

  constructor(
    private matSnackBar: MatSnackBar
  ) { }

  getMessage(): Observable<ToastMessage> {
    return this.toastMessage.asObservable();
  }

  setMessage(toastMessage: ToastMessage) {
    // console.log(toastMessage.detail);
    this.toastMessage.next(toastMessage);
    this.matSnackBar.open(toastMessage.detail, 'ok', { duration: 2 * 1000 });
  }

  success(message: string) {
    this.setMessage(new ToastMessage(message));
  }

  error(message: string) {
    this.setMessage(new ToastMessage(message, ToastMessage.ERROR));
  }
}
