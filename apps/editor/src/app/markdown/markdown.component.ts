import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { MarkedOptions } from 'marked';
// import { saveContent } from '@customdoc/util/content';

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
