import { Observable, Subject } from 'rxjs';
import {
  OverlayRef,
  FlexibleConnectedPositionStrategy,
  ConnectedOverlayPositionChange,
} from '@angular/cdk/overlay';
import { MarkdownToolbarConfig } from '../markdown.interfaces';
import { filter } from 'rxjs/operators';

export class MarkdownToolbarRef<T = any> {
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
  }

  close(menuResult?: T): void {
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
