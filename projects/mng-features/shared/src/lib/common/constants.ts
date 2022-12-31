// TODO - This needs to be passed via configuration
// import { environment } from '../../../../../../../../src/environments/environment';

export const ROUTE_NEW: string = 'new';
export const ITEMS_PER_PAGE_GLOBAL = 10;
export const enum CollName {
  UPLOADS = 'uploads',
  USERS = 'users',
}

// export const API_URL = (url: string, params?: { [key: string]: string }) => {
//   let urlToApply = url;
//   let paramsC = '?';
//   if (Array.isArray(url)) {
//     urlToApply = url.join('/');
//   }
//   if (params) {
//     Object.keys(params).forEach((key: string) => {
//       paramsC += `${key}=${params[key]}&`;
//     });
//   }
//   return 'environment.API_URL' + urlToApply + paramsC;
// };