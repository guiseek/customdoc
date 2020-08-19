import { ComponentType } from '@angular/cdk/portal';
import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { MarkdownService } from '../markdown.service';
import { MarkdownToolbarRef } from './markdown-toolbar-ref';
import { MarkdownToolbarComponent } from './markdown-toolbar.component';
import { HTMLEventTarget } from '../markdown.interfaces';

@Directive({
  selector: '[markdownToolbarTrigger]',
})
export class MarkdownToolbarTriggerDirective {
  @Input('markdownToolbarTrigger') trigger: ComponentType<
    MarkdownToolbarComponent
  >;
  private markdownToolbarRef: MarkdownToolbarRef;

  @HostBinding('style.position') position = 'relative';

  constructor(
    private service: MarkdownService
  ) {}

  @HostListener('contextmenu', ['$event'])
  openToolbar($event: HTMLEventTarget) {
    $event.preventDefault();
    $event.stopPropagation();
    
    if (this.markdownToolbarRef) {
      this.close();
    }
    this.markdownToolbarRef = this.service.openToolbar($event.target);
    return this.markdownToolbarRef;
  }
  close() {
    if (this.markdownToolbarRef) {
      this.markdownToolbarRef.close();
      this.markdownToolbarRef = null;
    }
  }
}
