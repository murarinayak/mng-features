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

  removeItem(key: string) {
    localStorage.removeItem(key);
  }

  reset(keysToKeep?: Map<string, string>) {
    this.getKeysMap(keysToKeep);
    localStorage.clear();
    // Put the keys back
    this.setKeysMap(keysToKeep);
    sessionStorage.clear();
  }

  getKeysMap(keysToKeep: Map<string, string>) {
    if (keysToKeep) {
      for(let key of keysToKeep.keys()) {
        keysToKeep.set(key, this.getItem(key));
        console.log('key', key, keysToKeep.get(key));
      }
    }
  }

  setKeysMap(keysToKeep: Map<string, string>) {
    if (keysToKeep) {
      for(let key of keysToKeep.keys()) {
        this.setItem(key, keysToKeep.get(key));
      }
    }
  }
}
