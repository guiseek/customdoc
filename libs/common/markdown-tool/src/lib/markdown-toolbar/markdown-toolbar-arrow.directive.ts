import {
  ChangeDetectorRef,
  Directive,
  HostBinding,
  OnDestroy,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MarkdownToolbarRef } from './markdown-toolbar-ref';

@Directive({
  selector: '[markdownToolbarArrow]',
})
export class MarkdownToolbarArrowDirective implements OnDestroy {
  @HostBinding('style.width.px')
  @HostBinding('style.height.px')
  arrowSize: number;

  @HostBinding('style.top.px')
  offsetTop: number;

  @HostBinding('style.right.px')
  offsetRight: number;

  @HostBinding('style.bottom.px')
  offsetBottom: number;

  @HostBinding('style.left.px')
  offsetLeft: number;

  private destroy$ = new Subject<void>();

  constructor(
    private markdownToolbarRef: MarkdownToolbarRef,
    private cd: ChangeDetectorRef
  ) {
    this.arrowSize = this.markdownToolbarRef.config.arrowSize;

    this.markdownToolbarRef
      .positionChanges()
      .pipe(takeUntil(this.destroy$))
      .subscribe((p) => {
        const { offsetX, offsetY } = p.connectionPair;

        this.offsetTop = offsetY >= 0 ? offsetY * -1 : null;
        this.offsetLeft = offsetX < 0 ? offsetX * -1 : null;
        this.offsetBottom = offsetY < 0 ? offsetY : null;
        this.offsetRight = offsetX >= 0 ? offsetX : null;

        this.cd.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.unsubscribe();
  }
}
