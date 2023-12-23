import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { StyleManagerService } from './style-manager.service';
import { IThemeOption } from './option.model';

@Injectable({ providedIn: 'root' })
export class MNGThemePickerService {

  constructor(
    private httpClient: HttpClient,
    private styleManager: StyleManagerService,
  ) { }

  getThemeOptions(): Observable<Array<IThemeOption>> {
    return this.httpClient.get<Array<IThemeOption>>('assets/theme-options.json');
  }
 
  setTheme(themeToSet) {
    console.log('settheme', themeToSet);
    this.styleManager.setStyle(
      'theme',
      `assets/themes/${themeToSet}.css`
    );
  }
}