import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'markdown-preview',
  template: `<page [innerHTML]="markdownContent"></page>`,
  // templateUrl: './markdown-preview.component.html',
  styleUrls: ['./markdown-preview.component.scss']
})
export class MarkdownPreviewComponent implements OnInit {
  @Input() markdownContent: string;

  constructor() { }

  ngOnInit(): void {
  }

}
