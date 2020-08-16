import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  AfterViewInit,
  OnDestroy,
  Input,
  Output,
  NgZone,
  ElementRef,
  ChangeDetectorRef,
  Renderer2,
  EventEmitter,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { Observable, Subject, Subscriber } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { SplitContentDirective } from './split-content.directive';
import {
  IArea,
  IAreaSnapshot,
  IOutputAreaSizes,
  IOutputData,
  IPoint,
  ISplitSnapshot,
} from './split-content.interfaces';
import {
  getAreaMaxSize,
  getAreaMinSize,
  getElementPixelSize,
  getGutterSideAbsorptionCapacity,
  getInputBoolean,
  getInputPositiveNumber,
  getPointFromEvent,
  isUserSizesValid,
  updateAreaSize,
} from './split-content.utils';

/**
 * Componente separador de conteúdos
 * 
 * @example
 * 
 * <split-content direction="horizontal" unit="percent">
 *   <div split-content-area> <!-- conteúdo --> </div>
 *   <div split-content-area> <!-- conteúdo --> </div>
 * </split-content>
 * 
 * @export
 * @class SplitContentComponent
 * @implements {AfterViewInit}
 * @implements {OnDestroy}
 */
@Component({
  selector: 'split-content',
  templateUrl: './split-content.component.html',
  styleUrls: ['./split-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SplitContentComponent implements AfterViewInit, OnDestroy {
  @Input() set direction(v: 'horizontal' | 'vertical') {
    this._direction = v === 'vertical' ? 'vertical' : 'horizontal';

    this.renderer.addClass(this.elRef.nativeElement, `as-${this._direction}`);
    this.renderer.removeClass(
      this.elRef.nativeElement,
      `as-${this._direction === 'vertical' ? 'horizontal' : 'vertical'}`
    );

    this.build(false, false);
  }

  get direction(): 'horizontal' | 'vertical' {
    return this._direction;
  }

  @Input() set unit(v: 'percent' | 'pixel') {
    this._unit = v === 'pixel' ? 'pixel' : 'percent';

    this.renderer.addClass(this.elRef.nativeElement, `as-${this._unit}`);
    this.renderer.removeClass(
      this.elRef.nativeElement,
      `as-${this._unit === 'pixel' ? 'percent' : 'pixel'}`
    );

    this.build(false, true);
  }

  get unit(): 'percent' | 'pixel' {
    return this._unit;
  }

  @Input() set gutterSize(v: number | null) {
    this._gutterSize = getInputPositiveNumber(v, 11);

    this.build(false, false);
  }

  get gutterSize(): number {
    return this._gutterSize;
  }

  @Input() set gutterStep(v: number) {
    this._gutterStep = getInputPositiveNumber(v, 1);
  }

  get gutterStep(): number {
    return this._gutterStep;
  }

  @Input() set restrictMove(v: boolean) {
    this._restrictMove = getInputBoolean(v);
  }

  get restrictMove(): boolean {
    return this._restrictMove;
  }

  @Input() set useTransition(v: boolean) {
    this._useTransition = getInputBoolean(v);

    if (this._useTransition)
      this.renderer.addClass(this.elRef.nativeElement, 'as-transition');
    else this.renderer.removeClass(this.elRef.nativeElement, 'as-transition');
  }

  get useTransition(): boolean {
    return this._useTransition;
  }

  @Input() set disabled(v: boolean) {
    this._disabled = getInputBoolean(v);

    if (this._disabled)
      this.renderer.addClass(this.elRef.nativeElement, 'as-disabled');
    else this.renderer.removeClass(this.elRef.nativeElement, 'as-disabled');
  }

  get disabled(): boolean {
    return this._disabled;
  }

  @Input() set dir(v: 'ltr' | 'rtl') {
    this._dir = v === 'rtl' ? 'rtl' : 'ltr';

    this.renderer.setAttribute(this.elRef.nativeElement, 'dir', this._dir);
  }

  get dir(): 'ltr' | 'rtl' {
    return this._dir;
  }

  @Input() set gutterDblClickDuration(v: number) {
    this._gutterDblClickDuration = getInputPositiveNumber(v, 0);
  }

  get gutterDblClickDuration(): number {
    return this._gutterDblClickDuration;
  }
  @Output() get transitionEnd(): Observable<IOutputAreaSizes> {
    return new Observable(
      (subscriber) => (this.transitionEndSubscriber = subscriber)
    ).pipe(debounceTime<IOutputAreaSizes>(20));
  }

  constructor(
    private ngZone: NgZone,
    private elRef: ElementRef,
    private cdRef: ChangeDetectorRef,
    private renderer: Renderer2
  ) {
    // Adiciona classe default, pode
    // ser sobreescrita com @Input()
    this.direction = this._direction;
  }

  private _direction: 'horizontal' | 'vertical' = 'horizontal';

  ////

  private _unit: 'percent' | 'pixel' = 'percent';

  ////

  private _gutterSize = 11;

  ////

  private _gutterStep = 1;

  ////

  private _restrictMove = false;

  ////

  private _useTransition = false;

  ////

  private _disabled = false;

  ////

  private _dir: 'ltr' | 'rtl' = 'ltr';

  ////

  private _gutterDblClickDuration = 0;

  ////

  @Output() dragStart = new EventEmitter<IOutputData>(false);
  @Output() dragEnd = new EventEmitter<IOutputData>(false);
  @Output() gutterClick = new EventEmitter<IOutputData>(false);
  @Output() gutterDblClick = new EventEmitter<IOutputData>(false);

  private transitionEndSubscriber: Subscriber<IOutputAreaSizes>;

  private dragProgressSubject: Subject<IOutputData> = new Subject();
  dragProgress$: Observable<
    IOutputData
  > = this.dragProgressSubject.asObservable();

  ////

  private isDragging = false;
  private dragListeners: Array<Function> = [];
  private snapshot: ISplitSnapshot | null = null;
  private startPoint: IPoint | null = null;
  private endPoint: IPoint | null = null;

  public readonly displayedAreas: Array<IArea> = [];
  private readonly hidedAreas: Array<IArea> = [];

  @ViewChildren('gutterEls') private gutterEls: QueryList<ElementRef>;

  _clickTimeout: number | null = null;

  public ngAfterViewInit() {
    this.ngZone.runOutsideAngular(() => {
      // Evita transition no primeiro render
      setTimeout(() =>
        this.renderer.addClass(this.elRef.nativeElement, 'as-init')
      );
    });
  }

  private getNbGutters(): number {
    return this.displayedAreas.length === 0
      ? 0
      : this.displayedAreas.length - 1;
  }

  public addArea(component: SplitContentDirective): void {
    const newArea: IArea = {
      component,
      order: 0,
      size: 0,
      minSize: null,
      maxSize: null,
    };

    if (component.visible === true) {
      this.displayedAreas.push(newArea);

      this.build(true, true);
    } else {
      this.hidedAreas.push(newArea);
    }
  }

  public removeArea(component: SplitContentDirective): void {
    if (this.displayedAreas.some((a) => a.component === component)) {
      const area = this.displayedAreas.find((a) => a.component === component);
      this.displayedAreas.splice(this.displayedAreas.indexOf(area), 1);

      this.build(true, true);
    } else if (this.hidedAreas.some((a) => a.component === component)) {
      const area = this.hidedAreas.find((a) => a.component === component);
      this.hidedAreas.splice(this.hidedAreas.indexOf(area), 1);
    }
  }

  public updateArea(
    component: SplitContentDirective,
    resetOrders: boolean,
    resetSizes: boolean
  ): void {
    if (component.visible === true) {
      this.build(resetOrders, resetSizes);
    }
  }

  public showArea(component: SplitContentDirective): void {
    const area = this.hidedAreas.find((a) => a.component === component);
    if (area === undefined) {
      return;
    }

    const areas = this.hidedAreas.splice(this.hidedAreas.indexOf(area), 1);
    this.displayedAreas.push(...areas);

    this.build(true, true);
  }

  public hideArea(comp: SplitContentDirective): void {
    const area = this.displayedAreas.find((a) => a.component === comp);
    if (area === undefined) {
      return;
    }

    const areas = this.displayedAreas.splice(
      this.displayedAreas.indexOf(area),
      1
    );
    areas.forEach((a) => {
      a.order = 0;
      a.size = 0;
    });
    this.hidedAreas.push(...areas);

    this.build(true, true);
  }

  public getVisibleAreaSizes(): IOutputAreaSizes {
    return this.displayedAreas.map((a) => (a.size === null ? '*' : a.size));
  }

  public setVisibleAreaSizes(sizes: IOutputAreaSizes): boolean {
    if (sizes.length !== this.displayedAreas.length) {
      return false;
    }

    const formatedSizes = sizes.map((s) => getInputPositiveNumber(s, null));
    const isValid = isUserSizesValid(this.unit, formatedSizes);

    if (isValid === false) {
      return false;
    }

    // @ts-ignore
    this.displayedAreas.forEach(
      (area, i) => (area.component._size = formatedSizes[i])
    );

    this.build(false, true);
    return true;
  }

  private build(resetOrders: boolean, resetSizes: boolean): void {
    this.stopDragging();

    // ¤ orderm de áreas

    if (resetOrders === true) {
      // Dev informando `order` para cada área, use-o para classificá-las.
      if (this.displayedAreas.every((a) => a.component.order !== null)) {
        this.displayedAreas.sort(
          (a, b) => <number>a.component.order - <number>b.component.order
        );
      }

      // Em seguida, defina a ordem real com múltiplos de 2,
      // os demais números entre eles usaremos nos gutters.
      this.displayedAreas.forEach((area, i) => {
        area.order = i * 2;
        area.component.setStyleOrder(area.order);
      });
    }

    // ¤ Tamanho das áreas

    if (resetSizes === true) {
      const useUserSizes = isUserSizesValid(
        this.unit,
        this.displayedAreas.map((a) => a.component.size)
      );

      switch (this.unit) {
        case 'percent': {
          const defaultSize = 100 / this.displayedAreas.length;

          this.displayedAreas.forEach((area) => {
            area.size = useUserSizes
              ? <number>area.component.size
              : defaultSize;
            area.minSize = getAreaMinSize(area);
            area.maxSize = getAreaMaxSize(area);
          });
          break;
        }
        case 'pixel': {
          if (useUserSizes) {
            this.displayedAreas.forEach((area) => {
              area.size = area.component.size;
              area.minSize = getAreaMinSize(area);
              area.maxSize = getAreaMaxSize(area);
            });
          } else {
            const wildcardSizeAreas = this.displayedAreas.filter(
              (a) => a.component.size === null
            );

            // Sem área curinga, deve pegar a primeira aleatória
            if (
              wildcardSizeAreas.length === 0 &&
              this.displayedAreas.length > 0
            ) {
              this.displayedAreas.forEach((area, i) => {
                area.size = i === 0 ? null : area.component.size;
                area.minSize = i === 0 ? null : getAreaMinSize(area);
                area.maxSize = i === 0 ? null : getAreaMaxSize(area);
              });
            }
            // Mais de uma área curinga deve manter a primeira aleatória
            else if (wildcardSizeAreas.length > 1) {
              let alreadyGotOne = false;
              this.displayedAreas.forEach((area) => {
                if (area.component.size === null) {
                  if (alreadyGotOne === false) {
                    area.size = null;
                    area.minSize = null;
                    area.maxSize = null;
                    alreadyGotOne = true;
                  } else {
                    area.size = 100;
                    area.minSize = null;
                    area.maxSize = null;
                  }
                } else {
                  area.size = area.component.size;
                  area.minSize = getAreaMinSize(area);
                  area.maxSize = getAreaMaxSize(area);
                }
              });
            }
          }
          break;
        }
      }
    }

    this.refreshStyleSizes();
    this.cdRef.markForCheck();
  }

  private refreshStyleSizes(): void {
    ///////////////////////////////////////////
    // Modo percentagem
    if (this.unit === 'percent') {
      // Apenas uma área > flex-basis 100%
      if (this.displayedAreas.length === 1) {
        this.displayedAreas[0].component.setStyleFlex(
          0,
          0,
          `100%`,
          false,
          false
        );
      }
      // Múltiplas áreas, use cada base percentual
      else {
        const sumGutterSize = this.getNbGutters() * this.gutterSize;

        this.displayedAreas.forEach((area) => {
          area.component.setStyleFlex(
            0,
            0,
            `calc( ${area.size}% - ${
              (<number>area.size / 100) * sumGutterSize
            }px )`,
            area.minSize !== null && area.minSize === area.size ? true : false,
            area.maxSize !== null && area.maxSize === area.size ? true : false
          );
        });
      }
    }
    ///////////////////////////////////////////
    // Modo pixel
    else if (this.unit === 'pixel') {
      this.displayedAreas.forEach((area) => {
        // Área com tamanho curinga
        if (area.size === null) {
          if (this.displayedAreas.length === 1) {
            area.component.setStyleFlex(1, 1, `100%`, false, false);
          } else {
            area.component.setStyleFlex(1, 1, `auto`, false, false);
          }
        }
        // Área com tamanho de pixel
        else {
          // Só uma área > flex-basis 100%
          if (this.displayedAreas.length === 1) {
            area.component.setStyleFlex(0, 0, `100%`, false, false);
          }
          // Múltiplas áreas, use pixel de base para cada uma
          else {
            area.component.setStyleFlex(
              0,
              0,
              `${area.size}px`,
              area.minSize !== null && area.minSize === area.size
                ? true
                : false,
              area.maxSize !== null && area.maxSize === area.size ? true : false
            );
          }
        }
      });
    }
  }

  public clickGutter(event: MouseEvent | TouchEvent, gutterNum: number): void {
    const tempPoint = getPointFromEvent(event);

    // Certifique-se de que o mouseup / touchend acontece no mesmo
    // ponto que o mouse / touchstart para acionar o clique / clique dbl
    if (
      this.startPoint &&
      this.startPoint.x === tempPoint.x &&
      this.startPoint.y === tempPoint.y
    ) {
      // Se o tempo limite estiver em andamento e novo clique em > clearTimeout & dblClickEvent
      if (this._clickTimeout !== null) {
        window.clearTimeout(this._clickTimeout);
        this._clickTimeout = null;
        this.notify('dblclick', gutterNum);
        this.stopDragging();
      }
      // Outro tempo limite de início para chamar clickEvent no final
      else {
        this._clickTimeout = window.setTimeout(() => {
          this._clickTimeout = null;
          this.notify('click', gutterNum);
          this.stopDragging();
        }, this.gutterDblClickDuration);
      }
    }
  }

  public startDragging(
    event: MouseEvent | TouchEvent,
    gutterOrder: number,
    gutterNum: number
  ): void {
    event.preventDefault();
    event.stopPropagation();

    this.startPoint = getPointFromEvent(event);
    if (this.startPoint === null || this.disabled === true) {
      return;
    }

    this.snapshot = {
      gutterNum,
      lastSteppedOffset: 0,
      allAreasSizePixel:
        getElementPixelSize(this.elRef, this.direction) -
        this.getNbGutters() * this.gutterSize,
      allInvolvedAreasSizePercent: 100,
      areasBeforeGutter: [],
      areasAfterGutter: [],
    };

    this.displayedAreas.forEach((area) => {
      const areaSnapshot: IAreaSnapshot = {
        area,
        sizePixelAtStart: getElementPixelSize(
          area.component.elRef,
          this.direction
        ),
        sizePercentAtStart: this.unit === 'percent' ? area.size : -1, // Modo pixel não será usado
      };

      if (area.order < gutterOrder) {
        if (this.restrictMove === true) {
          this.snapshot.areasBeforeGutter = [areaSnapshot];
        } else {
          this.snapshot.areasBeforeGutter.unshift(areaSnapshot);
        }
      } else if (area.order > gutterOrder) {
        if (this.restrictMove === true) {
          if (this.snapshot.areasAfterGutter.length === 0)
            this.snapshot.areasAfterGutter = [areaSnapshot];
        } else {
          this.snapshot.areasAfterGutter.push(areaSnapshot);
        }
      }
    });

    this.snapshot.allInvolvedAreasSizePercent = [
      ...this.snapshot.areasBeforeGutter,
      ...this.snapshot.areasAfterGutter,
    ].reduce((t, a) => t + a.sizePercentAtStart, 0);

    if (
      this.snapshot.areasBeforeGutter.length === 0 ||
      this.snapshot.areasAfterGutter.length === 0
    ) {
      return;
    }

    this.dragListeners.push(
      this.renderer.listen('document', 'mouseup', this.stopDragging.bind(this))
    );
    this.dragListeners.push(
      this.renderer.listen('document', 'touchend', this.stopDragging.bind(this))
    );
    this.dragListeners.push(
      this.renderer.listen(
        'document',
        'touchcancel',
        this.stopDragging.bind(this)
      )
    );

    this.ngZone.runOutsideAngular(() => {
      this.dragListeners.push(
        this.renderer.listen('document', 'mousemove', this.dragEvent.bind(this))
      );
      this.dragListeners.push(
        this.renderer.listen('document', 'touchmove', this.dragEvent.bind(this))
      );
    });

    this.displayedAreas.forEach((area) => area.component.lockEvents());

    this.isDragging = true;
    this.renderer.addClass(this.elRef.nativeElement, 'as-dragging');
    this.renderer.addClass(
      this.gutterEls.toArray()[this.snapshot.gutterNum - 1].nativeElement,
      'as-dragged'
    );

    this.notify('start', this.snapshot.gutterNum);
  }

  private dragEvent(event: MouseEvent | TouchEvent): void {
    event.preventDefault();
    event.stopPropagation();

    if (this._clickTimeout !== null) {
      window.clearTimeout(this._clickTimeout);
      this._clickTimeout = null;
    }

    if (this.isDragging === false) {
      return;
    }

    this.endPoint = getPointFromEvent(event);
    if (this.endPoint === null) {
      return;
    }

    // Calculate StepOffset

    let offset =
      this.direction === 'horizontal'
        ? this.startPoint.x - this.endPoint.x
        : this.startPoint.y - this.endPoint.y;
    if (this.dir === 'rtl') {
      offset = -offset;
    }
    const steppedOffset =
      Math.round(offset / this.gutterStep) * this.gutterStep;

    if (steppedOffset === this.snapshot.lastSteppedOffset) {
      return;
    }

    this.snapshot.lastSteppedOffset = steppedOffset;

    // É preciso saber se cada área gutter lateral pode reagir a um deslocamento escalonado

    let areasBefore = getGutterSideAbsorptionCapacity(
      this.unit,
      this.snapshot.areasBeforeGutter,
      -steppedOffset,
      this.snapshot.allAreasSizePixel
    );
    let areasAfter = getGutterSideAbsorptionCapacity(
      this.unit,
      this.snapshot.areasAfterGutter,
      steppedOffset,
      this.snapshot.allAreasSizePixel
    );

    // Cada área lateral da calha não pode absorver todo o deslocamento
    if (areasBefore.remain !== 0 && areasAfter.remain !== 0) {
      if (Math.abs(areasBefore.remain) === Math.abs(areasAfter.remain)) {
      } else if (Math.abs(areasBefore.remain) > Math.abs(areasAfter.remain)) {
        areasAfter = getGutterSideAbsorptionCapacity(
          this.unit,
          this.snapshot.areasAfterGutter,
          steppedOffset + areasBefore.remain,
          this.snapshot.allAreasSizePixel
        );
      } else {
        areasBefore = getGutterSideAbsorptionCapacity(
          this.unit,
          this.snapshot.areasBeforeGutter,
          -(steppedOffset - areasAfter.remain),
          this.snapshot.allAreasSizePixel
        );
      }
    }
    // As áreas antes da calha não podem absorver todo o deslocamento> é necessário recalcular os tamanhos das áreas após a calha.
    else if (areasBefore.remain !== 0) {
      areasAfter = getGutterSideAbsorptionCapacity(
        this.unit,
        this.snapshot.areasAfterGutter,
        steppedOffset + areasBefore.remain,
        this.snapshot.allAreasSizePixel
      );
    }
    // As áreas após a sarjeta não conseguem absorver todo o deslocamento> é necessário recalcular os tamanhos das áreas antes da sarjeta.
    else if (areasAfter.remain !== 0) {
      areasBefore = getGutterSideAbsorptionCapacity(
        this.unit,
        this.snapshot.areasBeforeGutter,
        -(steppedOffset - areasAfter.remain),
        this.snapshot.allAreasSizePixel
      );
    }

    if (this.unit === 'percent') {
      // Hackear por causa do navegador bagunçar com tamanhos usando calc (X% - Ypx) -> el.getBoundingClientRect()
      // Se não estiver lá, brincar com sarjetas faz com que o total caia para 99,99875% e depois 99,99286%, 99,98986%,..
      const all = [...areasBefore.list, ...areasAfter.list];
      const areaToReset = all.find(
        (a) =>
          a.percentAfterAbsorption !== 0 &&
          a.percentAfterAbsorption !== a.areaSnapshot.area.minSize &&
          a.percentAfterAbsorption !== a.areaSnapshot.area.maxSize
      );

      if (areaToReset) {
        areaToReset.percentAfterAbsorption =
          this.snapshot.allInvolvedAreasSizePercent -
          all
            .filter((a) => a !== areaToReset)
            .reduce((total, a) => total + a.percentAfterAbsorption, 0);
      }
    }

    // Agora sabemos que as áreas podem absorver StepOffset, hora de realmente atualizar os tamanhos

    areasBefore.list.forEach((item) => updateAreaSize(this.unit, item));
    areasAfter.list.forEach((item) => updateAreaSize(this.unit, item));

    this.refreshStyleSizes();
    this.notify('progress', this.snapshot.gutterNum);
  }

  private stopDragging(event?: Event): void {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }

    if (this.isDragging === false) {
      return;
    }

    this.displayedAreas.forEach((area) => area.component.unlockEvents());

    while (this.dragListeners.length > 0) {
      const fct = this.dragListeners.pop();
      if (fct) fct();
    }

    // Aviso: tem que ser antes de "notify('fim')"
    // porque "notify('end')" "pode ser vinculado a "[size]='x'">" build()" > "stopDragging()"
    this.isDragging = false;

    // Se movido do ponto de partida, notifique o fim
    if (
      this.endPoint &&
      (this.startPoint.x !== this.endPoint.x ||
        this.startPoint.y !== this.endPoint.y)
    ) {
      this.notify('end', this.snapshot.gutterNum);
    }

    this.renderer.removeClass(this.elRef.nativeElement, 'as-dragging');
    this.renderer.removeClass(
      this.gutterEls.toArray()[this.snapshot.gutterNum - 1].nativeElement,
      'as-dragged'
    );
    this.snapshot = null;

    // Necessário para permitir que o evento (click)="clickGutter(...)" seja executado e verifique se o mouse foi movido ou não
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.startPoint = null;
        this.endPoint = null;
      });
    });
  }

  public notify(
    type: 'start' | 'progress' | 'end' | 'click' | 'dblclick' | 'transitionEnd',
    gutterNum: number
  ): void {
    const sizes = this.getVisibleAreaSizes();

    if (type === 'start') {
      this.dragStart.emit({ gutterNum, sizes });
    } else if (type === 'end') {
      this.dragEnd.emit({ gutterNum, sizes });
    } else if (type === 'click') {
      this.gutterClick.emit({ gutterNum, sizes });
    } else if (type === 'dblclick') {
      this.gutterDblClick.emit({ gutterNum, sizes });
    } else if (type === 'transitionEnd') {
      if (this.transitionEndSubscriber) {
        this.ngZone.run(() => this.transitionEndSubscriber.next(sizes));
      }
    } else if (type === 'progress') {
      // Fique fora da zona para permitir que os usuários façam o
      // que quiserem sobre o mecanismo de detecção de alterações.
      this.dragProgressSubject.next({ gutterNum, sizes });
    }
  }

  public ngOnDestroy(): void {
    this.stopDragging();
  }
}
