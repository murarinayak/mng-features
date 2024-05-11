import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import { AuthService } from 'mng-features/auth';
import { IAuthUser, UserService } from 'mng-features/shared';
import { ToastService } from 'mng-features/toast';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  formGroup: UntypedFormGroup;
  user: IAuthUser;

  constructor(
    private toastService: ToastService,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.setForm();
    this.getUserDetails();
  }

  setForm() {
    this.formGroup = new UntypedFormGroup({
      displayName: new UntypedFormControl(this.user?.displayName ?? ''),
      firstName: new UntypedFormControl(this.user?.firstName ?? ''),
      lastName: new UntypedFormControl(this.user?.lastName ?? ''),
      email: new UntypedFormControl(this.user?.email ?? ''),
      phoneNumber: new UntypedFormControl(this.user?.phoneNumber ?? '')
    });
  }

  getUserDetails() {
    // console.log('uid', this.authService.getUID());
    this.userService.get(this.authService.getUID()).subscribe(
      (response: IAuthUser) => {
        // console.log('response', response);
        this.user = response;
        this.setForm();
      }
    );
  }

  onSaveClick() {
    const user: IAuthUser = {
      ...this.user,
      ...this.formGroup.value
    };
    this.userService.set(user).subscribe(
      (response) => {
        console.log('r', response);
        this.toastService.success('Save successful');
      }
    );
  }

}
