import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { HeaderModule } from 'mng-features/header';
import { FooterModule } from 'mng-features/footer';
import { BasicLayoutComponent } from './basic-layout/basic-layout.component';
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { PageLayoutComponent } from './page-layout/page-layout.component';

@NgModule({
  declarations: [
    BasicLayoutComponent,
    FullLayoutComponent,
    PageLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    HeaderModule,
    FooterModule,
  ],
  exports: [
    BasicLayoutComponent,
    FullLayoutComponent,
    PageLayoutComponent
  ]
})
export class LayoutModule { }