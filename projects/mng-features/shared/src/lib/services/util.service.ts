import { Inject } from "@angular/core";

export class UtilService {
  constructor(
    @Inject('env') private environment
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
    return this.environment.API_URL + urlToApply + paramsC;
  }
}