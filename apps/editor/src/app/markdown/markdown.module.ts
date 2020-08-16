import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MarkdownRoutingModule } from './markdown-routing.module';
import { MarkdownComponent } from './markdown.component';
import { SplitContentModule } from '@customdoc/common/split-content';
import { ToolbarEditorMarkdownModule } from '@customdoc/common/toolbar-editor';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [{ path: '', component: MarkdownComponent }];

@NgModule({
  declarations: [MarkdownComponent],
  imports: [
    CommonModule,
    SplitContentModule,
    ReactiveFormsModule,
    ToolbarEditorMarkdownModule,
    MarkdownRoutingModule,
    RouterModule.forChild(routes),
  ],
})
export class MarkdownModule {}
