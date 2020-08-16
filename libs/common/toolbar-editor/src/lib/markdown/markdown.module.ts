import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarMarkdownComponent } from './toolbar-markdown.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [ToolbarMarkdownComponent],
  imports: [
    CommonModule,
    OverlayModule,
    ReactiveFormsModule
  ],
  exports: [ToolbarMarkdownComponent]
})
export class ToolbarEditorMarkdownModule { }
