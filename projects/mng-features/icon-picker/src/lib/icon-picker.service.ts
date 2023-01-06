import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOption } from 'mng-features/shared';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class MNGIconPickerService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getIcons(): Observable<Array<IOption>> {
    return this.readOriginalJSON();
  }

  readOriginalJSON() {
    return this.httpClient.get('./assets/font-response.original.json').pipe(
      map((response: { icons: Array<unknown> }) => {
        return response.icons.map((item: { name: string }) => {
          return { value: item.name } as IOption;
        })
      })
    )
  }
}