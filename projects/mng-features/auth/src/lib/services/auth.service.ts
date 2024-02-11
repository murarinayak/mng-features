import { Injectable } from '@angular/core';
import {
  AdditionalUserInfo, Auth, UserCredential, getAdditionalUserInfo,
  signInWithEmailAndPassword, signInWithPopup
} from '@angular/fire/auth';
import { Observable, from, map, of, switchMap, tap } from 'rxjs';
import { LoggerService, UserService, IAuthUser, AuthUserType, MNGBrowserStorageService, LocalStorageCommonKeys } from 'mng-features/shared';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private loggerService: LoggerService,
    private afAuth: Auth,
    private userService: UserService,
    private browserStorageService: MNGBrowserStorageService,
  ) { }

  signInWithPopup(authProvider) {
    let isNewUser = false;
    return from(signInWithPopup(this.afAuth, authProvider)).pipe(
      map((response: UserCredential) => {
        const additionalUserInfo: AdditionalUserInfo = getAdditionalUserInfo(response);
        const authUser: IAuthUser = this.processAuthUser(response, additionalUserInfo);
        this.loggerService.log('on login', response);
        isNewUser = additionalUserInfo.isNewUser;
        return authUser;
      }),
      switchMap((response: IAuthUser) => {
        // this.loggerService.log('then', response);
        return this.addUpdateInUserColl(response);
      }),
    );
  }

  addUpdateInUserColl(authUser: IAuthUser): Observable<IAuthUser> {
    return this.userService.get(authUser.uid).pipe(
      switchMap((response: IAuthUser) => {
        if (response) {
          this.userService.updateInMemory(response);
          return of(authUser);
        } else {
          return this.userService.post(authUser).pipe(
            switchMap(() => this.addUpdateInUserColl(authUser)),
          );
        }
      })
    );
  }

  signInWithEmailAndPassword(email: string, password: string) {
    // let isNewUser = false;
    return from(signInWithEmailAndPassword(this.afAuth, email, password)).pipe(
      map((response) => {
        const authUser: IAuthUser = this.processAuthUser(response);
        this.loggerService.log('on login', response);
        // isNewUser = response.additionalUserInfo.isNewUser;
        return authUser;
      }),
      switchMap((response: IAuthUser) => {
        return this.userService.get(response.uid).pipe(
          switchMap((responseAuthUser: IAuthUser) => {
            // console.log('rr', response);
            if (responseAuthUser) {
              return of(responseAuthUser);
            }
            return this.userService.set(response).pipe(
              switchMap(() => this.userService.get(response.uid))
            );
          }),
          tap((rAuthUser: IAuthUser) => {
            this.userService.updateInMemory(rAuthUser);
          })
        );
      }),
    )
  }


  processAuthUser(data: UserCredential, additionalUserInfo?: AdditionalUserInfo): IAuthUser {
    return {
      uid: data?.user?.uid ?? '',
      email: data?.user?.email ?? '',
      firstName: additionalUserInfo?.profile['given_name'].toString() ?? '',
      lastName: additionalUserInfo?.profile['family_name'].toString() ?? '',
      displayName: data?.user?.displayName ?? '',
      locale: additionalUserInfo?.profile['locale'].toString() ?? 'en-GB', // might use this for translation
      phoneNumber: data?.user?.phoneNumber ?? '',
      photoURL: data?.user?.photoURL ?? '',
      isAnonymous: data?.user?.isAnonymous ?? false,
      userType: AuthUserType.USER,
    };
  }

  getUID() {
    return this.userService.getLoggedInUserID();
  }

  isLoggedIn() {
    return this.userService.getLoggedInUserID() !== '';
  }

  logout() {
    const keysToKeep: Map<string, string> = new Map();
    keysToKeep.set(LocalStorageCommonKeys.APP_DEFAULT_URL, '');
    this.browserStorageService.reset(keysToKeep);
    // remove user from local storage to log user out
    // localStorage.removeItem('currentUser');
    this.router.navigate(['/']);
    setTimeout(() => window.location.reload(), 0);
  }
}
