import { Observable, Subject } from 'rxjs';
import {
  OverlayRef,
  FlexibleConnectedPositionStrategy,
  ConnectedOverlayPositionChange,
} from '@angular/cdk/overlay';
import { MarkdownToolbarConfig } from '../markdown.interfaces';
import { filter } from 'rxjs/operators';
import { AfterViewInit, ElementRef, OnInit } from '@angular/core';

export class MarkdownToolbarRef<T = any> {
  public static target: HTMLElement;
  private oldColor: string;
  private style: CSSStyleDeclaration;
  private afterClosedSubject = new Subject<T>();

  constructor(
    private overlayRef: OverlayRef,
    private positionStrategy: FlexibleConnectedPositionStrategy,
    public config: MarkdownToolbarConfig
  ) {
    
    this.overlayRef.backdropClick().subscribe(() => {
      this.close();
    });
    this.overlayRef
      .keydownEvents()
      .pipe(filter((event) => event.key === 'Escape'))
      .subscribe(() => {
        this.close();
      });
      
      const { target } = this.config;
      this.style = target.style;
      this.highlightTarget();
  }

  highlightTarget() {
    this.oldColor = this.style.backgroundColor;
    this.style.backgroundColor = '#00000010';
  }
  close(menuResult?: T): void {
    this.style.backgroundColor = this.oldColor;
    this.afterClosedSubject.next(menuResult);
    this.afterClosedSubject.complete();
    this.overlayRef.dispose();
  }

  afterClosed(): Observable<T> {
    return this.afterClosedSubject.asObservable();
  }

  positionChanges(): Observable<ConnectedOverlayPositionChange> {
    return this.positionStrategy.positionChanges;
  }
}
