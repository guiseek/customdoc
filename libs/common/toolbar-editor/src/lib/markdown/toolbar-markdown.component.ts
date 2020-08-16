import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'toolbar-markdown',
  templateUrl: './toolbar-markdown.component.html',
  styleUrls: ['./toolbar-markdown.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ToolbarMarkdownComponent),
      multi: true,
    },
    // ToolbarEditorService,
  ],
})
export class ToolbarMarkdownComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
