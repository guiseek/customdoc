import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { parse, MarkedOptions } from 'marked';
import { saveContent } from '@customdoc/util/content';

type HTMLInputEvent = InputEvent & {
  target: HTMLElement;
};

const contentOptions: MarkedOptions = {
  gfm: true,
  breaks: true,
  highlight: (code: string, lang: string, cb: Function) => {
    console.log(code, lang);
  },
};

@Component({
  selector: 'editor-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss'],
})
export class MarkdownComponent implements OnInit {
  markdownContent: SafeHtml = '';

  constructor(private http: HttpClient) {}

  onChange(change?) {
    console.log(change);
    this.markdownContent = change;
  }

  ngOnInit(): void {
    const headers = { Accept: 'text/plain', 'Content-Type': 'text/plain' };
    this.http.get('assets/README.md', { headers, responseType: 'text' })
      .subscribe(data => {
        // const file = new Blob([data], { type: 'text/plain' });
        // const a = document.createElement('a');
        // a.href = URL.createObjectURL(file);
        // a.download = 'README.md';
        window.setTimeout(() => {
          // saveContent(data, 'README.md');
        }, 3000);
      });
  }
}
