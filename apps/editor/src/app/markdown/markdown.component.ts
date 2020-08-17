import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'editor-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss'],
})
export class MarkdownComponent implements OnInit {
  markdownContent: SafeHtml = '';

  onChange(change: string) {
    this.markdownContent = change;
  }

  ngOnInit(): void {}
}
