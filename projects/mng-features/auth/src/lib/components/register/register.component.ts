import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../../../../../shared/src/lib/services/toast.service';
import { UserService } from '../../../../../shared/src/lib/services/user.service';
import { User } from '../../../../../shared/src/lib/models/common.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  user: User;
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastService: ToastService
  ) { }

  register(firstName, lastName, username, password) {
    // this.loading = true;
    this.user = new User();
    this.user.firstName = firstName;
    this.user.lastName = lastName;
    this.user.username = username;
    this.user.password = password;
    this.userService.signUp(this.user)
      .subscribe(
        data => {
          this.toastService.success('Registration successful');
          this.router.navigate(['/auth/login']);
        },
        error => {
          this.toastService.error(error);
          this.loading = false;
        }
      );
  }

}
