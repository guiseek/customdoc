import { MarkedOptions, parse } from 'marked';
import { Overlay } from '@angular/cdk/overlay';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { ElementRef, Injectable, Injector } from '@angular/core';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { MarkdownToolbarRef } from './markdown-toolbar/markdown-toolbar-ref';
import { markdownToolbarConfig, markdownToolbarPositions} from './markdown-toolbar/markdown-toolbar-config';
import { MarkdownToolbarComponent } from './markdown-toolbar/markdown-toolbar.component';
import { MarkdownToolbarContainer } from './markdown-toolbar/markdown-toolbar.container';
import { saveFile } from './utils';

const options: MarkedOptions = {
  gfm: true,
  breaks: true,
  highlight: (code: string, lang: string, cb: Function) => {
    console.log(code, lang);
  },
};

@Injectable({
  providedIn: 'root',
})
export class MarkdownService {
  constructor(
    private http: HttpClient,
    private overlay: Overlay,
    private injector: Injector,
    private sanitizer: DomSanitizer,
  ) {}

  fromTarget({ innerText }: HTMLElement) {
    return this.parse(innerText);
  }

  private parse(content: string) {
    const markdown = parse(content, options);
    return this.sanitizer.bypassSecurityTrustHtml(markdown);
  }

  save(content: string) {
    return saveFile(content, 'README.md');
  }
  read(markdownPath: string) {
    const headers = { 'Accept': 'text/plain', 'Content-Type': 'text/plain' };
    return this.http.get(markdownPath, { headers, responseType: 'text' })
  }

  openToolbar(target: ElementRef | HTMLElement) {
    const position = this.overlay
      .position()
      .flexibleConnectedTo(target)
      .withPush(false)
      .withFlexibleDimensions(false)
      .withPositions(markdownToolbarPositions);

    const scroll = this.overlay.scrollStrategies.reposition();

    const overlayRef = this.overlay.create({
      ...markdownToolbarConfig,
      positionStrategy: position,
      scrollStrategy: scroll,
    });

    const markdownToolbarRef = new MarkdownToolbarRef(
      overlayRef,
      position,
      markdownToolbarConfig
    );

    const markdownToolbar = overlayRef.attach(
      new ComponentPortal(
        MarkdownToolbarContainer,
        null,
        new PortalInjector(
          this.injector,
          new WeakMap<any, any>([[MarkdownToolbarRef, markdownToolbarRef]])
        )
      )
    ).instance;

    markdownToolbar.attachComponentPortal(
      new ComponentPortal(
        MarkdownToolbarComponent,
        null,
        new PortalInjector(
          this.injector,
          new WeakMap<any, any>([[MarkdownToolbarRef, markdownToolbarRef]])
        )
      )
    );
    return markdownToolbarRef;
  }
}
