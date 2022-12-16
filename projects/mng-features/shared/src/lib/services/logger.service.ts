import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() { }

  log(...args) { console.log(args) };
  
  warn(...args) { console.warn(args) };

  error(...args) { console.error(args) };

}
