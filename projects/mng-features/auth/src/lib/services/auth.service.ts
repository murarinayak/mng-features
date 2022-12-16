import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, map, of, switchMap, tap } from 'rxjs';
import { LoggerService } from '../../../../shared/src/lib/services/logger.service';

import { UserService } from '../../../../shared/src/lib/services/user.service';
import { IAuthUser } from '../../../../shared/src/lib/models/common.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private loggerService: LoggerService,
    private afAuth: AngularFireAuth, // Inject Firebase auth service
    private userService: UserService,
  ) { }

  signInWithPopup(authProvider) {
    let isNewUser = false;
    
    return from(this.afAuth.signInWithPopup(authProvider)).pipe(
      map((response: firebase.default.auth.UserCredential) => {
        const authUser: IAuthUser = this.processAuthUser(response);
        this.loggerService.log('on login', response);
        isNewUser = response.additionalUserInfo.isNewUser;
        return authUser;
      }),
      switchMap((response: IAuthUser) => {
        // this.loggerService.log('then', response);
        if (isNewUser) {
          return this.userService.post(response);
        } else {
          return this.userService.get(response.uid).pipe(
            tap((response: IAuthUser) => this.userService.updateInMemory(response))
          );
        }
      }),
      // catchError(error => {
      //   console.log('error', error);
      //   return throwError(() => error);
      // })
    );
  }

  signInWithEmailAndPassword(email: string, password: string) {
    // let isNewUser = false;
    return from(this.afAuth.signInWithEmailAndPassword(email, password)).pipe(
      map((response) => {
        const authUser: IAuthUser = this.processAuthUser(response);
        this.loggerService.log('on login', response);
        // isNewUser = response.additionalUserInfo.isNewUser;
        return authUser;
      }),
      switchMap((response: IAuthUser) => {
        // this.loggerService.log('then', response);
        // if (isNewUser) {
        //   return this.userService.post(response);
        // } else {
        return this.userService.get(response.uid).pipe(
          switchMap((responseAuthUser: IAuthUser) => {
            console.log('rr', response);
            if (responseAuthUser) {
              return of(responseAuthUser);
            }
            return this.userService.post(response).pipe(
              switchMap(() => this.userService.get(response.uid))
            );
          }),
          tap((rAuthUser: IAuthUser) => {
            this.userService.updateInMemory(rAuthUser);
          })
        );
        // }
      }),
    )
  }

  // processSignInResponse(response: firebase.default.auth.UserCredential) {
  //   const authUser: IAuthUser = this.processAuthUser(response);
  //   this.loggerService.log('on login', response);
  //   isNewUser = response.additionalUserInfo.isNewUser;
  //   return authUser;
  // }

  processAuthUser(data: firebase.default.auth.UserCredential): IAuthUser {
    return {
      uid: data?.user?.uid ?? '',
      email: data?.user?.email ?? '',
      firstName: data?.additionalUserInfo?.profile['given_name'] ?? '',
      lastName: data?.additionalUserInfo?.profile['family_name'] ?? '',
      displayName: data?.user?.displayName ?? '',
      locale: data?.additionalUserInfo?.profile['locale'] ?? 'en-GB', // might use this for translation
      phoneNumber: data?.user?.phoneNumber ?? '',
      photoURL: data?.user?.photoURL ?? '',
      isAnonymous: data?.user?.isAnonymous ?? false
    };
  }

  // saveAuthUser(response, authMethod: AuthMethods = AuthMethods.EMAIL): Observable<void | IUser> {
  //   if (authMethod === AuthMethods.OAUTH_ANDROID) {
  //     // This is a fix as the Mobile OAuth isn't providing a full object as compared to the Web OAuth
  //     this.userCredential = {
  //       user: response,
  //       credential: response.authentication
  //     };
  //   } else {
  //     this.userCredential = response;
  //   }
  //   return this.userService.addUpdateUserInfo(this.userCredential).pipe(
  //     tap(() => {
  //       this.storageService.setItem(StorageConstants.AUTH, this.userCredential);
  //     })
  //   );
  // }
}
