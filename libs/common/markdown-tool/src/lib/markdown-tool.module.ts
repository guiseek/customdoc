import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { MarkdownContentComponent } from './markdown-content/markdown-content.component';
import { MarkdownEditorComponent } from './markdown-editor/markdown-editor.component';
import { MarkdownPreviewComponent } from './markdown-preview/markdown-preview.component';
import { MarkdownToolbarComponent } from './markdown-toolbar/markdown-toolbar.component';
import { MarkdownToolbarContainer } from './markdown-toolbar/markdown-toolbar.container';
import { MarkdownToolbarTriggerDirective } from './markdown-toolbar/markdown-toolbar-trigger.directive';
import { PageComponent } from './page.component';

@NgModule({
  imports: [CommonModule, PortalModule, OverlayModule],
  declarations: [
    MarkdownContentComponent,
    MarkdownEditorComponent,
    MarkdownPreviewComponent,
    MarkdownToolbarComponent,
    MarkdownToolbarContainer,
    MarkdownToolbarTriggerDirective,
    PageComponent,
  ],
  exports: [
    MarkdownContentComponent,
    MarkdownEditorComponent,
    MarkdownPreviewComponent,
    MarkdownToolbarComponent,
    MarkdownToolbarContainer,
    MarkdownToolbarTriggerDirective,
    PageComponent,
  ],
})
export class MarkdownToolModule {}
