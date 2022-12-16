import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WindowService {

  constructor() { }

  openNewWindow(path: string) {
    window.open(path, '_blank')
  }
}
