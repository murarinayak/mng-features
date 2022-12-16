// TODO - This needs to be passed via configuration
import { environment } from '../../../../../../../../src/environments/environment';

export const enum LocalStorageCommonKeys {
  USER_INFO = 'USER_INFO'
}

export const enum CollName {
  USERS = 'USERS'
}

export const API_URL = (url: string, params?: { [key: string]: string }) => {
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
  return environment.API_URL + urlToApply + paramsC;
};