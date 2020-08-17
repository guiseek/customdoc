export type HTMLEventTarget = InputEvent & {
  target: HTMLElement;
};

export interface MarkdownToolbarConfig {
  hasBackdrop?: boolean;
  backdropClass: string;
  panelClass: string;
}