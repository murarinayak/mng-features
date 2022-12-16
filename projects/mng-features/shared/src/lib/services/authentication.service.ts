import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable()
export class AuthenticationService {

  constructor(
    private http: HttpClient,
    private userService: UserService
  ) { }

  login(username: string, password: string) {
    return this.http.post<any>('/api/authenticate', { username: username, password: password }).pipe(
      map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
      })
    );
  }

  getUID() {
    return this.userService.getLoggedInUserID();
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

}
