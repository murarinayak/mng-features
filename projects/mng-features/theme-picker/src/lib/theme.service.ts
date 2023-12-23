
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IThemeOption } from './option.model';
import { StyleManagerService } from './style-manager.service';

@Injectable({ providedIn: 'root' })
export class ThemeService {

  constructor(
    private http: HttpClient,
    private styleManager: StyleManagerService,
  ) {}
 
  getThemeOptions(): Observable<Array<IThemeOption>> {
    return this.http.get<Array<IThemeOption>>('assets/theme-options.json');
  }
 
  setTheme(themeToSet) {
    console.log('settheme', themeToSet);
    this.styleManager.setStyle(
      "theme",
      `assets/${themeToSet}.css`
    );
  }
}