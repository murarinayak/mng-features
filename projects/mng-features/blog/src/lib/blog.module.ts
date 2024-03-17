import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NgOptimizedImage } from '@angular/common'
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';

import { BlogRoutingModule } from './blog-routing.module';
import { BlogListComponent } from './components/blog-list/blog-list.component';
import { PostItemComponent } from './components/post-item/post-item.component';
import { PostItemShortComponent } from './components/post-item-short/post-item-short.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostViewComponent } from './components/post-view/post-view.component';

@NgModule({
  declarations: [
    BlogListComponent,
    PostItemComponent,
    PostItemShortComponent,
    PostListComponent,
    PostViewComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    NgOptimizedImage,
    BlogRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
  ],
  exports: [
    PostItemShortComponent,
  ]
})
export class BlogModule { }
