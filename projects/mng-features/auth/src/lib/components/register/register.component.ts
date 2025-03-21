import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, User } from 'mng-features/shared';
import { ToastService } from 'mng-features/toast';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: false
})
export class RegisterComponent {

  user: User;
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: ToastService,
  ) { }

  register(firstName: string, lastName: string, username: string, password: string) {
    // this.loading = true;
    this.user = new User();
    this.user.firstName = firstName;
    this.user.lastName = lastName;
    this.user.username = username;
    this.user.password = password;
    console.log('create sign up flow');
    // this.userService.signUp(this.user).subscribe({
    //   next: data => {
    //     this.toastService.success('Registration successful');
    //     this.router.navigate(['/auth/login']);
    //   },
    //   error: error => {
    //     this.toastService.error(error);
    //     this.loading = false;
    //   }
    // });
  }

}
