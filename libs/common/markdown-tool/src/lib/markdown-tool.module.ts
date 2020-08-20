import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownContentComponent } from './markdown-content/markdown-content.component';
import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';
import { MarkdownPreviewComponent } from './markdown-preview/markdown-preview.component';
import { MarkdownToolbarComponent } from './markdown-toolbar/markdown-toolbar.component';
import { MarkdownToolbarContainer } from './markdown-toolbar/markdown-toolbar.container';
import { MarkdownToolbarTriggerDirective } from './markdown-toolbar/markdown-toolbar-trigger.directive';
import { MarkdownOptionsComponent } from './markdown-options/markdown-options.component';
import { MarkdownToolbarArrowDirective } from './markdown-toolbar/markdown-toolbar-arrow.directive';
import { MarkdownDropdownComponent } from './markdown-dropdown/markdown-dropdown.component';

@NgModule({
  imports: [CommonModule, HttpClientModule, PortalModule, OverlayModule],
  declarations: [
    MarkdownContentComponent,
    MarkdownEditorComponent,
    MarkdownPreviewComponent,
    MarkdownToolbarComponent,
    MarkdownToolbarContainer,
    MarkdownToolbarTriggerDirective,
    MarkdownOptionsComponent,
    MarkdownToolbarArrowDirective,
    MarkdownDropdownComponent,
  ],
  exports: [
    MarkdownContentComponent,
    MarkdownEditorComponent,
    MarkdownPreviewComponent,
    MarkdownToolbarComponent,
    MarkdownToolbarContainer,
    MarkdownToolbarTriggerDirective,
    MarkdownOptionsComponent,
    MarkdownToolbarArrowDirective,
    MarkdownDropdownComponent,
  ],
})
export class MarkdownToolModule {}
