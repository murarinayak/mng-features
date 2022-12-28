import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { LocalStorageCommonKeys, MNGBrowserStorageService } from 'mng-features/shared';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private storageService: MNGBrowserStorageService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.storageService.getItem(LocalStorageCommonKeys.USER_INFO)) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
