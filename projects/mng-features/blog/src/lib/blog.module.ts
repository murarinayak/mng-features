import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { PostItemShortComponent } from './post-item-short/post-item-short.component';

@NgModule({
  declarations: [
    BlogListComponent,
    PostItemComponent,
    PostItemShortComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BlogRoutingModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    PostItemShortComponent,
  ]
})
export class BlogModule { }
