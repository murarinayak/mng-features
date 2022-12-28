import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MNGBrowserStorageService {

  constructor() { }

  setItem(key: string, value: unknown) {
    if (key && value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  getItem(key: string) {
    const storedData = localStorage.getItem(key);
    if (storedData) {
      return JSON.parse(storedData);
    }
    return null;
  }

  clear() {
    localStorage.clear();
    sessionStorage.clear();
  }
}
