import {
  Directive,
  ElementRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { SplitContentComponent } from './split-content.component';
import { getInputBoolean, getInputPositiveNumber } from './split-content.utils';

@Directive({
  selector: '[splitContentArea],[split-content-area],split-content-area',
})
export class SplitContentDirective implements OnInit, OnDestroy {
  /**
   * @description Define a ordem das áreas
   * 
   * @private
   * @type {(number | null)}
   * @memberOf SplitContentDirective
   */
  private _order: number | null = null;

  @Input() set order(v: number | null) {
    this._order = getInputPositiveNumber(v, null);

    this.split.updateArea(this, true, false);
  }

  get order(): number | null {
    return this._order;
  }

  /**
   * @description Define tamanho da área
   * 
   * @type {(number | null)}
   * @memberOf SplitContentDirective
   */
  public _size: number | null = null;

  @Input() set size(v: number | null) {
    this._size = getInputPositiveNumber(v, null);

    this.split.updateArea(this, false, true);
  }

  get size(): number | null {
    return this._size;
  }

  /**
   * @description Limitar tamanho mínimo da área
   * 
   * @private
   * @type {(number | null)}
   * @memberOf SplitContentDirective
   */
  private _minSize: number | null = null;

  @Input() set minSize(v: number | null) {
    this._minSize = getInputPositiveNumber(v, null);

    this.split.updateArea(this, false, true);
  }

  get minSize(): number | null {
    return this._minSize;
  }

  /**
   * @description Limita o tamanho máximo
   * 
   * @private
   * @type {(number | null)}
   * @memberOf SplitContentDirective
   */
  private _maxSize: number | null = null;

  @Input() set maxSize(v: number | null) {
    this._maxSize = getInputPositiveNumber(v, null);

    this.split.updateArea(this, false, true);
  }

  get maxSize(): number | null {
    return this._maxSize;
  }

  /**
   * @description Bloqueia o tamanho definido
   * 
   * @private
   * 
   * @memberOf SplitContentDirective
   */
  private _lockSize = false;

  @Input() set lockSize(v: boolean) {
    this._lockSize = getInputBoolean(v);

    this.split.updateArea(this, false, true);
  }

  get lockSize(): boolean {
    return this._lockSize;
  }

  /**
   * @description Define a visibilidade da área
   * 
   * @private
   * 
   * @memberOf SplitContentDirective
   */
  private _visible = true;

  @Input() set visible(v: boolean) {
    this._visible = getInputBoolean(v);

    if (this._visible) {
      this.split.showArea(this);
      this.renderer.removeClass(this.elRef.nativeElement, 'as-hidden');
    } else {
      this.split.hideArea(this);
      this.renderer.addClass(this.elRef.nativeElement, 'as-hidden');
    }
  }

  get visible(): boolean {
    return this._visible;
  }

  /**
   * @internal
   * 
   * @private
   * @type {Function}
   * @memberOf SplitContentDirective
   */
  private transitionListener: Function;
  private readonly lockListeners: Array<Function> = [];

  constructor(
    private ngZone: NgZone,
    public elRef: ElementRef,
    private renderer: Renderer2,
    private split: SplitContentComponent
  ) {
    this.renderer.addClass(this.elRef.nativeElement, 'as-split-area');
  }

  public ngOnInit(): void {
    this.split.addArea(this);

    this.ngZone.runOutsideAngular(() => {
      this.transitionListener = this.renderer.listen(
        this.elRef.nativeElement,
        'transitionend',
        (event: TransitionEvent) => {
          // trigger de transição só em flex-basis
          if (event.propertyName === 'flex-basis') {
            this.split.notify('transitionEnd', -1);
          }
        }
      );
    });
  }

  public setStyleOrder(value: number): void {
    this.renderer.setStyle(this.elRef.nativeElement, 'order', value);
  }

  public setStyleFlex(
    grow: number,
    shrink: number,
    basis: string,
    isMin: boolean,
    isMax: boolean
  ): void {
    /**
     * Precisa de 3 propriedades separadas para funcionar no IE11
     * @see https://github.com/angular/flex-layout/issues/323
     */
    this.renderer.setStyle(this.elRef.nativeElement, 'flex-grow', grow);
    this.renderer.setStyle(this.elRef.nativeElement, 'flex-shrink', shrink);
    this.renderer.setStyle(this.elRef.nativeElement, 'flex-basis', basis);

    if (isMin === true)
      this.renderer.addClass(this.elRef.nativeElement, 'as-min');
    else this.renderer.removeClass(this.elRef.nativeElement, 'as-min');

    if (isMax === true)
      this.renderer.addClass(this.elRef.nativeElement, 'as-max');
    else this.renderer.removeClass(this.elRef.nativeElement, 'as-max');
  }

  public lockEvents(): void {
    this.ngZone.runOutsideAngular(() => {
      this.lockListeners.push(
        this.renderer.listen(
          this.elRef.nativeElement,
          'selectstart',
          (e: Event) => false
        )
      );
      this.lockListeners.push(
        this.renderer.listen(
          this.elRef.nativeElement,
          'dragstart',
          (e: Event) => false
        )
      );
    });
  }

  public unlockEvents(): void {
    while (this.lockListeners.length > 0) {
      const fct = this.lockListeners.pop();
      if (fct) fct();
    }
  }

  public ngOnDestroy(): void {
    this.unlockEvents();

    if (this.transitionListener) {
      this.transitionListener();
    }

    this.split.removeArea(this);
  }
}
