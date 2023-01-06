import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UtilService {
  constructor(
    // @Inject('environment') private environment,
    private httpClient: HttpClient,
  ) { }

  getApiUrl(url: string, params?: { [key: string]: string }) {
    let urlToApply = url;
    let paramsC = '?';
    if (Array.isArray(url)) {
      urlToApply = url.join('/');
    }
    if (params) {
      Object.keys(params).forEach((key: string) => {
        paramsC += `${key}=${params[key]}&`;
      });
    }
    // return this.environment.API_URL + urlToApply + paramsC;
  }

  getAllIcons() {
    return this.httpClient.get('https://fonts.google.com/metadata/icons?key=material_symbols&incomplete=true').pipe(
      map((response: { icons: Array<unknown> }) => {
        return response.icons.map((item: { name: string }) => {
          return { name: item.name }
        })
      })
    );
  }
}