import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAuthProvider } from '@angular/fire/auth';

import { AuthService } from '../../services/auth.service';
import { User, IAuthUser } from 'mng-features/shared';
import { ToastService } from 'mng-features/toast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnInit {

  user: User;
  loading = false;
  returnUrl: string;
  loginMandatory = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastService: ToastService,
  ) { }

  ngOnInit() {
    this.handleRedirectResult();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (window.location.href.indexOf('stories') !== -1) {
      this.loginMandatory = false;
    }
  }

  login(email: string, password: string) {
    // console.log(email, password);
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
        // console.log('r', response);
        this.onLoginSuccess();
      },
      error: this.onError
    });
  }

  onLoginWithGoogleClickP() {
    // console.log('open google signin');
    this.authService.signInWithPopup(new GoogleAuthProvider).subscribe({
      next: (response) => {
        // console.log('res', response);
        this.onLoginSuccess();
      },
      error: this.onError
    });
  }

  onLoginWithGoogleClickR() {
    // console.log('open google signin');
    this.authService.signInWithRedirect(new GoogleAuthProvider).subscribe({
      next: (response) => {
        console.log('res', response);
        // this.onLoginSuccess();
      },
      error: this.onError
    });
  }
 
  /** Handle after redirect */
  handleRedirectResult() {
    this.authService.handleRedirectResult().subscribe({
      next: (response: IAuthUser) => {
        if (response) {
          // console.log('User signed in:', response);
          this.onLoginSuccess();
        }
      }
    });
  }

  onLoginSuccess() {
    // console.log('Login success');
    // this.loggerService.log('Login success');
    // this.stateManagerService.setActive();
    // if (!this.authService.isVerified()) {
    //   this.message = 'Please verify your email first! 2' ?? '1';
    //   return;
    // }
    this.router.navigate([this.returnUrl]);
    // setTimeout(() => window.location.reload(), 0);
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
    console.log('create sign in flow');
    // this.userService.signIn1(this.user).subscribe({
    //   next: (response: IResponseModel) => {
    //     this.storageService.setItem(LocalStorageCommonKeys.USER_INFO, response?.data ?? '');
    //     this.router.navigate([this.returnUrl]);
    //   },
    //   error: this.onError
    // });
  }

}
