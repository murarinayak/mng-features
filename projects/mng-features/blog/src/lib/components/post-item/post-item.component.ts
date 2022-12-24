import { Component, Input, OnInit } from '@angular/core';
import { IWpPost } from '../../common/common.model';


@Component({
  selector: 'app-post-item',
  templateUrl: './post-item.component.html'
})
export class PostItemComponent implements OnInit {

  @Input() post: IWpPost;

  constructor() { }

  ngOnInit(): void {
  }

  onLinkClick() {
    // alert('show post view');
  }

}
