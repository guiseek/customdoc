import { ComponentType } from '@angular/cdk/portal';
import { Directive, HostBinding, HostListener, Input } from '@angular/core';
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

  constructor(private service: MarkdownService) {}

  @HostListener('contextmenu', ['$event'])
  openToolbar($event: HTMLEventTarget) {
    console.log('$event');
    
    $event.preventDefault();
    $event.stopPropagation();

    console.log(this.markdownToolbarRef);
    
    if (this.markdownToolbarRef) {
      this.close();
    }
    console.log(this.markdownToolbarRef);
    this.markdownToolbarRef = this.service.openToolbar($event.target);
    console.log(this.markdownToolbarRef);
    return this.markdownToolbarRef;
  }
  close() {
    if (this.markdownToolbarRef) {
      this.markdownToolbarRef.close();
      this.markdownToolbarRef = null;
    }
  }
}
