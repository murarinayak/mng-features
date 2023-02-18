// TODO - This needs to be passed via configuration
// Test v1
// import { environment } from '../../../../../../../../src/environments/environment';

export const enum RouteParts {
  NEW = 'new'
}
export const ITEMS_PER_PAGE_GLOBAL = 10;
export const enum CollNameGlobal {
  UPLOADS = 'uploads',
  USERS = 'users',
}
export const enum AuthUserType {
  USER = 1,
  ADMIN = 2,
  SUPER_ADMIN = 3
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