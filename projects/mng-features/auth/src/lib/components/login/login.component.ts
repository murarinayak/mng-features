import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import firebase from 'firebase/compat/app';

import { AuthService } from '../../services/auth.service';
import { StorageService, UserService, LocalStorageCommonKeys, IResponseModel, User } from 'mng-features/shared';
import { ToastService } from 'mng-features/toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User;
  loading = false;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private toastService: ToastService,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login(email: string, password: string) {
    console.log(email, password)
    if (email === 'q') {
      email = 'demouser1@murarinayak.com';
      password = 'pass@123';
    }
    if (!email || !password) {
      this.toastService.error('Please enter all fields');
      return;
    }
    this.authService.signInWithEmailAndPassword(email, password).subscribe({
      next: (response) => {
        console.log('r', response);
        this.onLoginSuccess();
      },
      error: this.onError
    });
  }

  onLoginWithGoogleClick() {
    console.log('open google signin');
    this.authService.signInWithPopup(new firebase.auth.GoogleAuthProvider).subscribe({
      next: (response) => {
        console.log('res', response);
        this.onLoginSuccess();
      },
      error: this.onError
    });
  }

  onLoginSuccess() {
    console.log('Login success');
    // this.loggerService.log('Login success');
    // this.stateManagerService.setActive();
    // if (!this.authService.isVerified()) {
    //   this.message = 'Please verify your email first! 2' ?? '1';
    //   return;
    // }
    this.router.navigate([this.returnUrl]);
  }

  onError = (error) => {
    const errorMessage = error?.error?.message ?? error.message ?? error.statusTxt ?? 'Error';
    this.toastService.error(errorMessage);
    // alert(errorMessage);
    this.loading = false;
  }

  login1(username, password) {
    // this.toastService.error('Incorrect username/password');
    // return;
    // this.loading = true;
    this.user = new User();
    this.user.username = username;
    this.user.password = password;
    this.userService.signIn1(this.user).subscribe({
      next: (response: IResponseModel) => {
        this.storageService.setItem(LocalStorageCommonKeys.USER_INFO, response?.data ?? '');
        this.router.navigate([this.returnUrl]);
      },
      error: this.onError
    });
  }

}
