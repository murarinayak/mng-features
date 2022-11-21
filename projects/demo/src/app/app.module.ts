import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MNGFeaturesModule } from 'projects/mng-features/src/public-api';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MNGFeaturesModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
