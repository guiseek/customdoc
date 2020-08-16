import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MarkdownRoutingModule } from './markdown-routing.module';
import { MarkdownComponent } from './markdown.component';
import { SplitContentModule } from '@customdoc/common/split-content';
import { MarkdownToolModule } from '@customdoc/common/markdown-tool';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: MarkdownComponent }];

@NgModule({
  declarations: [MarkdownComponent],
  imports: [
    CommonModule,
    SplitContentModule,
    ReactiveFormsModule,
    MarkdownToolModule,
    MarkdownRoutingModule,
    RouterModule.forChild(routes),
  ],
})
export class MarkdownModule {}
