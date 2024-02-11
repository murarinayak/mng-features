import { Injectable } from '@angular/core';
// import { AngularFirestore, DocumentSnapshot } from '@angular/fire/compat/firestore';
// import { from, Observable, of } from 'rxjs';
// import { map, tap } from 'rxjs/operators';
import { Firestore } from '@angular/fire/firestore';

import { MNGBrowserStorageService } from './browser-storage.service';
import { CollNameGlobal } from '../common/constants'
import { IAuthUser } from '../models/common.model';
import { LocalStorageCommonKeys } from '../common/browser-storage.keys';
import { FirestoreService } from './firestore.service';
import { tap } from 'rxjs';
// import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService extends FirestoreService<unknown>  {

  private loggedInUser: IAuthUser;

  constructor(
    // private ngFirestore: AngularFirestore,
    ngFirestore: Firestore,
    private storageService: MNGBrowserStorageService
  ) {
    super(ngFirestore);
    this.collName = CollNameGlobal.USERS;
  }

  getLoggedInUser(): IAuthUser {
    if (!this.loggedInUser) {
      this.loggedInUser = this.storageService.getItem(LocalStorageCommonKeys.USER_INFO);
    }
    return this.loggedInUser;
  }
  
  getLoggedInUserID() {
    return this.getLoggedInUser()?.uid ?? '';
  }

  // list() {}

  // get(id: string): Observable<IAuthUser | undefined> {
  //   return this.ngFirestore.collection(CollNameGlobal.USERS).doc(id).get().pipe(
  //     map((ds: DocumentSnapshot<IAuthUser>) => ds.data())
  //   );
  //   // return of(undefined);
  // }
  
  // post(item: IAuthUser) {
  //   return from(this.ngFirestore.collection(CollNameGlobal.USERS).doc(item.uid).set(item)).pipe(
  //     tap(() => this.updateInMemory(item))
  //   );
  // }

  override set(item: IAuthUser) {
    item.id = item.uid;
    return super.set(item).pipe(
      tap(() => this.updateInMemory(item))
    );
  }

  // put(item: IAuthUser) {
  //   return from(this.ngFirestore.collection(CollNameGlobal.USERS).doc(item.uid).update(item)).pipe(
  //     tap((response) => {
  //       console.log('r', response);
  //       this.updateInMemory(item);
  //     })
  //   );
  // }

  updateInMemory(item: IAuthUser) {
    this.loggedInUser = item;
    this.storageService.setItem(LocalStorageCommonKeys.USER_INFO, item);
  }
  
  // ----------

  // signUp(user: User) {
  //   return this.http.post(API_URL('signup'), user);
  // }

  // signIn1(user: User) {
  //   return this.http.post(API_URL('signin'), user).pipe(
  //     tap((response: IResponseModel) => this.loggedInUser = response.data)
  //   );
  // }

  // signOut1(user: User) {
  //   return this.http.post(API_URL('signout'), user);
  // }

  // getAll1() {
  //   return this.http.get<User[]>(API_URL('users'));
  // }

  // getById(id: number) {
  //   return this.http.get(API_URL('users/') + id);
  // }

  // create(user: User) {
  //   return this.http.post(API_URL('users'), user);
  // }

  // update1(user: User) {
  //   return this.http.put(API_URL('users/') + user.id, user);
  // }

  // delete1(id: number) {
  //   return this.http.delete(API_URL('users/') + id);
  // }

}
