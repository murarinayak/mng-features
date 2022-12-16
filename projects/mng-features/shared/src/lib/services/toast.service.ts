import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ToastMessage } from '../models/toast-message.model';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastMessage: Subject<ToastMessage> = new Subject();

  constructor() { }

  getMessage(): Observable<ToastMessage> {
    return this.toastMessage.asObservable();
  }

  setMessage(toastMessage: ToastMessage) {
    this.toastMessage.next(toastMessage);
  }

  success(message: string) {
    this.setMessage(new ToastMessage(message));
  }

  error(message: string) {
    this.setMessage(new ToastMessage(message, ToastMessage.ERROR));
  }
}
