import { Component, HostListener, Input, ViewEncapsulation } from '@angular/core';
import { HTMLInputTarget } from '../content.interfaces';

const elements = 'div,p,h1,h2,h3,h4,h5,h6,ul,ol,li';

@Component({
  selector: 'content-page',
  template: `<div [attr.contenteditable]="editable"><ng-content></ng-content></div>`,
  encapsulation: ViewEncapsulation.None,
  styles: [`
    content-page {
      flex: 1;
      background: white;
      margin: 1.5cm;
      padding: 2cm;
      box-shadow: 0 0 0.5cm rgba(0,0,0,0.5);
    }
    @media print {
      body, content-page {
        margin: 0;
        box-shadow: 0;
      }
    }
  `]
})
export class PageComponent {
  
  @Input()
  set editable(editable: boolean) {
    this._editable = editable;
  }
  get editable() {
    return this._editable;
  }
  private _editable: boolean;

  @HostListener('click', ['$event'])
  onClick({ target }: HTMLInputTarget) {
    (target.querySelector(elements) as HTMLInputElement)?.focus();
  }
}
