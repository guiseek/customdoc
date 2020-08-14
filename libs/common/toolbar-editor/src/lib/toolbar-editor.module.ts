import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarEditorComponent } from './toolbar-editor.component';
import { ToolbarEditorRowComponent } from './row/toolbar-editor-row.component';
import { ToolbarEditorSelectComponent } from './select/toolbar-editor-select.component';

@NgModule({
  imports: [CommonModule, OverlayModule, FormsModule, ReactiveFormsModule],
  declarations: [
    ToolbarEditorComponent,
    ToolbarEditorRowComponent,
    ToolbarEditorSelectComponent,
  ],
  exports: [
    ToolbarEditorComponent,
    ToolbarEditorRowComponent,
    ToolbarEditorSelectComponent,
  ],
})
export class ToolbarEditorModule {}
