import { Component, Input } from '@angular/core';

@Component({
  selector: 'mng-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class MNGImageComponent {

  private _src: string;
  @Input() set src(value: string) {
    if (!value) {
      value = 'https://i0.wp.com/www.murarinayak.com/blog/wp-content/uploads/2022/10/wp-featured-blank.webp';
    }
    this._src = value;
  }
  get src(): string {
    return this._src;
  }

  @Input() alt: string = 'Image';
}
