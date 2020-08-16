export type HTMLEventTarget = InputEvent & {
  target: HTMLElement;
};
export type HTMLInputTarget = InputEvent & {
  target: HTMLInputElement;
};

export interface MarkdownToolbarConfig {
  hasBackdrop?: boolean;
  backdropClass: string;
  panelClass: string;
}