import { Component } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false
})
export class AppComponent {
  title = 'demo';

  disabled = false;
  color: ThemePalette = 'primary';
  touchUi = false;
  colorCtr = new FormControl(null);

}
