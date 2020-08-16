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
  markdown: HTMLElement;
  constructor(
    private sanitizer: DomSanitizer,
    private elRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const markdown = this.elRef.nativeElement.querySelector('#markdown');
    
    this.renderer.listen(markdown, 'input', (evt: HTMLInputEvent) => {
      const content = evt.target.innerText;
      const markdownContent = parse(content, contentOptions);
      this.markdownContent = this.sanitize(markdownContent);
    });
  }
  sanitize(content: string) {
    return this.sanitizer.bypassSecurityTrustHtml(content);
  }
}
