import { Component, HostListener, ViewEncapsulation } from '@angular/core';
import { HTMLInputTarget } from './markdown.interfaces';

const elements = 'div,p,h1,h2,h3,h4,h5,h6,ul,ol,li';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'page',
  template: `<div contenteditable><ng-content></ng-content></div>`,
  encapsulation: ViewEncapsulation.None,
  styles: [`
    page {
      flex: 1;
      background: white;
      margin: 1.5cm;
      padding: 2cm;
      box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
    }
    @media print {
      body, page {
        margin: 0;
        box-shadow: 0;
      }
    }
  `]
})
export class PageComponent {
  @HostListener('click', ['$event'])
  onClick({ target }: HTMLInputTarget) {
    (target.querySelector(elements) as HTMLInputElement)?.focus();
  }
}