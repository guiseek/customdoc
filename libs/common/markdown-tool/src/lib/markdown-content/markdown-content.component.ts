import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'markdown-content',
  templateUrl: './markdown-content.component.html',
  styleUrls: ['./markdown-content.component.scss'],
})
export class MarkdownContentComponent implements OnInit {
  @Input()
  set editable(editable: boolean) {
    this._editable = editable;
  }
  get editable() {
    return this._editable;
  }
  private _editable: boolean;

  @HostListener('click', ['$event'])
  onClick({ target }) {
    (target.querySelector(
      'div,p,h1,h2,h3,h4,h5,h6,ul,ol,li'
    ) as HTMLInputElement)?.focus();
  }

  ngOnInit(): void {}
}
