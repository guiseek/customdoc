import { Component, OnInit } from '@angular/core';
import { ToolbarEditorConfig } from '@customdoc/common/toolbar-editor';

@Component({
  selector: 'editor-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.scss']
})
export class DocumentComponent implements OnInit {
  htmlContent1 = '';
  config1: ToolbarEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '5rem',
    maxHeight: '15rem',
    // placeholder: 'Enter text here...',
    translate: 'no',
    sanitize: true,
    toolbarPosition: 'top',
    outline: true,
    defaultFontName: 'Montserrat',
    defaultFontSize: '5',
    // showToolbar: false,
    defaultParagraphSeparator: 'p',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText',
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    toolbarHiddenButtons: [['bold', 'italic'], ['fontSize']],
  };
  constructor() { }

  ngOnInit(): void {
  }
  onChange(event) {
    console.log('changed');
  }

  onBlur(event) {
    console.log('blur ' + event);
  }
}
