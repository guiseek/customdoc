import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'markdown-dropdown',
  templateUrl: './markdown-dropdown.component.html',
  styleUrls: ['./markdown-dropdown.component.scss']
})
export class MarkdownDropdownComponent {
  isOpen = false;
  @Input() id = '';
  @Output() execute: EventEmitter<string> = new EventEmitter<string>();
}
