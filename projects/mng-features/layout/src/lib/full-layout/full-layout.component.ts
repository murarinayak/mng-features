import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class FullLayoutComponent implements OnInit {

  title = 'To be filled';

  constructor() { }

  ngOnInit() {
  }

}
