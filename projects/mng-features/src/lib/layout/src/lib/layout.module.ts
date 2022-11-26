import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { BasicLayoutComponent } from './basic-layout/basic-layout.component';
import { FullLayoutComponent } from './full-layout/full-layout.component';
import { PageLayoutComponent } from './page-layout/page-layout.component';
import { FooterComponent } from './footer/footer.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    BasicLayoutComponent,
    FullLayoutComponent,
    PageLayoutComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
  ],
  exports: [
    BasicLayoutComponent,
    FullLayoutComponent,
    PageLayoutComponent
  ]
})
export class LayoutModule { }