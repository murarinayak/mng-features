import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mng-app-state',
  templateUrl: './app-state.component.html',
  styleUrls: ['./app-state.component.css'],
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: false
})
export class MNGAppStateComponent {

  private _state: string;
  @Input() set state(value: string) {
    if (!value) {
      value = 'https://i0.wp.com/www.murarinayak.com/blog/wp-content/uploads/2022/10/wp-featured-blank.webp';
    }
    this._state = value;
  }
  get state(): string {
    return this._state;
  }

  @Input() alt: string = 'app-state';
}
