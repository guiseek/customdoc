import { filter, tap, map, withLatestFrom, pairwise } from 'rxjs/operators';
import { PageEvent, PaginatorState } from './paginator.interfaces';
import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class PaginatorStore extends ComponentStore<PaginatorState> {
  // *********** Updaters *********** //

  readonly setPageIndex = this.updater((state, value: string | number) => ({
    ...state,
    pageIndex: Number(value) || 0,
  }));

  readonly setPageSize = this.updater((state, value: string | number) => ({
    ...state,
    pageSize: Number(value) || 0,
  }));

  readonly setLength = this.updater((state, value: string | number) => ({
    ...state,
    length: Number(value) || 0,
  }));

  readonly setPageSizeOptions = this.updater(
    (state, value: readonly number[]) => {
      // Certificando-se de que o pageSize está incluído e classificado
      const pageSizeOptions = new Set<number>(
        [...value, state.pageSize].sort((a, b) => a - b)
      );
      return { ...state, pageSizeOptions };
    }
  );

  readonly changePageSize = this.updater((state, newPageSize: number) => {
    const startIndex = state.pageIndex * state.pageSize;
    return {
      ...state,
      pageSize: newPageSize,
      pageIndex: Math.floor(startIndex / newPageSize),
    };
  });

  // *********** Selectors *********** //

  readonly hasPreviousPage$ = this.select(
    ({ pageIndex, pageSize }) => pageIndex >= 1 && pageSize !== 0
  );

  readonly numberOfPages$ = this.select(({ pageSize, length }) => {
    if (!pageSize) return 0;
    return Math.ceil(length / pageSize);
  });

  readonly hasNextPage$ = this.select(
    this.state$,
    this.numberOfPages$,
    ({ pageIndex, pageSize }, numberOfPages) => {
      const maxPageIndex = numberOfPages - 1;
      return pageIndex < maxPageIndex && pageSize !== 0;
    }
  );

  readonly rangeLabel$ = this.select(({ pageIndex, pageSize, length }) => {
    if (length === 0 || pageSize === 0) {
      return `0 of ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = pageIndex * pageSize;

    // Se o índice inicial exceder o comprimento da lista, não tente corrigir o índice final até o fim.
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;

    return `${startIndex + 1} – ${endIndex} of ${length}`;
  });

  // ViewModel do componente Paginator
  readonly vm$ = this.select(
    this.state$,
    this.hasPreviousPage$,
    this.hasNextPage$,
    this.rangeLabel$,
    (state, hasPreviousPage, hasNextPage, rangeLabel) => ({
      pageSize: state.pageSize,
      pageSizeOptions: [...state.pageSizeOptions],
      pageIndex: state.pageIndex,
      hasPreviousPage,
      hasNextPage,
      rangeLabel,
    })
  );

  private readonly pageIndexChanges$ = this.state$.pipe(
    // mapear em vez de selecionar, para que um valor não distinto possa passar
    map((state) => state.pageIndex),
    pairwise()
  );

  readonly page$: Observable<PageEvent> = this.select(
    // primeiro Observable 👇
    this.pageIndexChanges$,
    // segundo Observable 👇
    this.select((state) => [state.pageSize, state.length]),
    // Agora combinando os resultados de ambos os Observáveis em um objeto PageEvent
    ([previousPageIndex, pageIndex], [pageSize, length]) => ({
      pageIndex,
      previousPageIndex,
      pageSize,
      length,
    }),
    // debounce, para que possamos deixar o estado "liquidar"
    { debounce: true }
  );

  readonly nextPage = this.effect((trigger$) => {
    return trigger$.pipe(
      withLatestFrom(this.hasNextPage$),
      filter(([, hasNextPage]) => hasNextPage),
      tap(([, hasNextPage]) => {
        this.setPageIndex(this.get().pageIndex + 1);
      })
    );
  });

  readonly firstPage = this.effect((trigger$) => {
    return trigger$.pipe(
      withLatestFrom(this.hasPreviousPage$),
      filter(([, hasPreviousPage]) => hasPreviousPage),
      tap(([, hasPreviousPage]) => {
        this.setPageIndex(0);
      })
    );
  });

  readonly previousPage = this.effect((trigger$) => {
    return trigger$.pipe(
      withLatestFrom(this.hasPreviousPage$),
      filter(([, hasPreviousPage]) => hasPreviousPage),
      tap(([, hasPreviousPage]) => {
        this.setPageIndex(this.get().pageIndex - 1);
      })
    );
  });

  readonly lastPage = this.effect((trigger$) => {
    return trigger$.pipe(
      withLatestFrom(this.hasNextPage$, this.numberOfPages$),
      filter(([, hasNextPage]) => hasNextPage),
      tap(([, hasNextPage, numberOfPages]) => {
        this.setPageIndex(numberOfPages - 1);
      })
    );
  });
}
