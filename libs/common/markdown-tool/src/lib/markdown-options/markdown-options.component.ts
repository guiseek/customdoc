import { DOCUMENT } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';

const modifySelection = (
  { textContent }: Node,
  prefix: string,
  suffix = ''
) => {
  return `${prefix}${textContent}${suffix}`;
};

@Component({
  selector: 'markdown-options',
  templateUrl: './markdown-options.component.html',
  styleUrls: ['./markdown-options.component.scss'],
})
export class MarkdownOptionsComponent implements OnInit {
  @Output() execute: EventEmitter<string> = new EventEmitter<string>();
  @Input() hiddenButtons: string[][];
  @Input() id = '';

  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngOnInit(): void {}

  triggerCommand(cmd: string) {
    if (cmd === 'undo' || cmd === 'redo') {
      this.document.execCommand(cmd, false);
      return;
    }
    const selected = this.document.getSelection();
    const content = this.execCommand(cmd, selected);
    selected.anchorNode.textContent = content;
  }
  execCommand(command: string, { anchorNode }) {
    switch (command) {
      case 'h1':
        return modifySelection(anchorNode, `# `);
      case 'h2':
        return modifySelection(anchorNode, `## `);
      case 'h3':
        return modifySelection(anchorNode, `### `);
      case 'h4':
        return modifySelection(anchorNode, `#### `);
      case 'h5':
        return modifySelection(anchorNode, `##### `);
      case 'h6':
        return modifySelection(anchorNode, `###### `);
      case 'bold':
        return modifySelection(anchorNode, '**', '**');
      case 'italic':
        return modifySelection(anchorNode, '_', '_');
    }
  }
}
