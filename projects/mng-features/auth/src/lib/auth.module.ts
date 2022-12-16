import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SharedModule } from 'mng-features/shared';
import { GoogleLoginMatIconComponent } from './components/google-login-mat-icon/google-login-mat-icon.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    GoogleLoginMatIconComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    AuthRoutingModule,
    FormsModule,
    AngularFireAuthModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
