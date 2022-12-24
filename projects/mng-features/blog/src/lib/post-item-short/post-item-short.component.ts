import { Component, Input, OnInit } from '@angular/core';

import { IPost } from '../common/common.model';

@Component({
  selector: 'app-post-item-short',
  templateUrl: './post-item-short.component.html',
  styleUrls: ['./post-item-short.component.scss']
})
export class PostItemShortComponent implements OnInit {

  @Input() post: IPost;

  constructor() { }

  ngOnInit(): void {
  }

}
