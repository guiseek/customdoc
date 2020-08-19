import { ElementRef } from '@angular/core';

export type HTMLEventTarget = InputEvent & {
  target: HTMLElement;
};

export interface MarkdownToolbarConfig {
  hasBackdrop?: boolean;
  backdropClass: string;
  panelClass: string;
  arrowOffset: number;
  arrowSize: number;
  target?: HTMLElement;
}