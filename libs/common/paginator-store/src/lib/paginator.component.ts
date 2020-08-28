import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { PaginatorStore } from './paginator.store';

@Component({
  selector: 'paginator-store',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PaginatorStore],
})
export class PaginatorComponent {
  @Input() set pageIndex(value: string | number) {
    this.paginatorStore.setPageIndex(value);
  }

  @Input() set length(value: string | number) {
    this.paginatorStore.setLength(value);
  }

  @Input() set pageSize(value: string | number) {
    this.paginatorStore.setPageSize(value);
  }

  @Input() set pageSizeOptions(value: readonly number[]) {
    this.paginatorStore.setPageSizeOptions(value);
  }

  // Gerando o evento diretamente da propriedade $ Observable <PageEvent> da página.
  /** Evento emitido quando o paginador altera o tamanho da página ou o índice da página. */
  @Output() readonly page = this.paginatorStore.page$;

  // ViewModel do componente Paginator
  readonly vm$ = this.paginatorStore.vm$;

  constructor(private readonly paginatorStore: PaginatorStore) {
    // definindo padrões
    this.paginatorStore.setState({
      pageIndex: 0,
      pageSize: 10,
      length: 0,
      pageSizeOptions: new Set<number>([50]),
    });
  }

  changePageSize(newPageSize: number) {
    this.paginatorStore.changePageSize(newPageSize);
  }
  nextPage() {
    this.paginatorStore.nextPage();
  }
  firstPage() {
    this.paginatorStore.firstPage();
  }
  previousPage() {
    this.paginatorStore.previousPage();
  }
  lastPage() {
    this.paginatorStore.lastPage();
  }
}
