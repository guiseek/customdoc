import { Component } from '@angular/core';
import { MarkdownToolbarRef } from './markdown-toolbar-ref';

@Component({
  selector: 'markdown-toolbar',
  templateUrl: './markdown-toolbar.component.html',
  styleUrls: ['./markdown-toolbar.component.scss']
})
export class MarkdownToolbarComponent {
  constructor(public markdownToolbarRef: MarkdownToolbarRef) {}
}
