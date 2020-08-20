import { DOCUMENT } from '@angular/common';
import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { modifySelection } from '../utils';


@Component({
  selector: 'markdown-options',
  templateUrl: './markdown-options.component.html',
  styleUrls: ['./markdown-options.component.scss'],
})
export class MarkdownOptionsComponent implements OnInit {
  @Output() executed: EventEmitter<void> = new EventEmitter<void>();
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
    this.executed.emit();
  }
  execCommand(command: string, { anchorNode }) {
    switch (command) {
      case 'h1':
        return modifySelection(anchorNode, '# ');
      case 'h2':
        return modifySelection(anchorNode, '## ');
      case 'h3':
        return modifySelection(anchorNode, '### ');
      case 'h4':
        return modifySelection(anchorNode, '#### ');
      case 'h5':
        return modifySelection(anchorNode, '##### ');
      case 'h6':
        return modifySelection(anchorNode, '###### ');
      case 'ul':
        return modifySelection(anchorNode, '- ');
      case 'ol':
        return modifySelection(anchorNode, '1. ');
      case 'bold':
        return modifySelection(anchorNode, '**', '**');
      case 'italic':
        return modifySelection(anchorNode, '_', '_');
    }
  }
}
