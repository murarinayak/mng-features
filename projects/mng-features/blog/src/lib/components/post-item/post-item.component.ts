import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html'
})
export class PostItemComponent implements OnInit {

  @Input() post;

  constructor() { }

  ngOnInit(): void {
  }

  onLinkClick() {
    // alert('show post view');
  }

}
