import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { HTMLEventTarget } from '../markdown.interfaces';
import { MarkdownService } from '../markdown.service';

@Component({
  selector: 'markdown-editor',
  templateUrl: './markdown-editor.component.html',
  styleUrls: ['./markdown-editor.component.scss'],
})
export class MarkdownEditorComponent implements OnInit {
  @Input() value: string;
  @Output() markdownChange = new EventEmitter<SafeHtml>();

  constructor(
    private service: MarkdownService,
    private elRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    const markdown = this.elRef.nativeElement.querySelector('markdown-content');
    this.renderer.listen(markdown, 'input', (evt: HTMLEventTarget) => {
      this.markdownChange.emit(this.service.fromTarget(evt.target));
    });
  }
}
