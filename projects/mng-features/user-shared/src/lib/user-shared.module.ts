import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserSharedRoutingModule } from './user-shared-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UserSharedRoutingModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [
    ProfileComponent,
  ]
})
export class UserSharedModule { }
