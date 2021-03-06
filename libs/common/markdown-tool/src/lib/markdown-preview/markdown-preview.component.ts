import { Component, Input } from '@angular/core';

@Component({
  selector: 'markdown-preview',
  templateUrl: './markdown-preview.component.html',
  styleUrls: ['./markdown-preview.component.scss']
})
export class MarkdownPreviewComponent {
  @Input() markdownContent: string;
}
