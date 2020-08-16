import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { parse, MarkedOptions } from 'marked';

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

  onChange(change?) {
    console.log(change);
    this.markdownContent = change;
  }

  ngOnInit(): void {

  }
}
