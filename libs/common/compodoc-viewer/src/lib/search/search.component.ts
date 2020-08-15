import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';
import { CompodocViewer } from '../compodoc-viewer.interfaces';

type valueof<T> = T[keyof T];

type CompodocResult = {
  type: string;
} & {
  results: valueof<CompodocViewer.Compodoc>;
};

@Component({
  selector: 'compodoc-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() url: string;
  @Input() documentation$: Observable<CompodocViewer.Compodoc>;

  filteredDocumentation$: Observable<CompodocResult[]>;

  searchControl = new FormControl('', [Validators.minLength(1)]);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (!this.url) {
      throw new Error('Informe a URL da documentação (JSON).');
    }
    this.listenCompodocSearch();
  }

  listenCompodocSearch() {
    this.filteredDocumentation$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      // startWith<string>(''),
      filter((v) => v && (v as string).length > 1),
      switchMap((value) => this.filterDocumentation(value as string))
    );
  }
  filterDocumentation(query = ''): Observable<CompodocResult[]> {
    return this.http.get<CompodocViewer.Compodoc>(this.url).pipe(
      map((documentation) => {
        const results = [];

        const interfaces = documentation.interfaces.filter(
          (c) => c.name.indexOf(query) > -1
        );
        if (interfaces) {
          results.push({ type: 'interfaces', results: interfaces });
        }

        const components = documentation.components.filter(
          (c) => c.name.indexOf(query) > -1
        );
        if (components) {
          results.push({ type: 'components', results: components });
        }

        const directives = documentation.directives.filter(
          (c) => c.name.indexOf(query) > -1
        );
        if (directives) {
          results.push({ type: 'directives', results: components });
        }

        const modules = documentation.modules.filter(
          (c) => c.name.indexOf(query) > -1
        );
        if (modules) {
          results.push({ type: 'modules', results: components });
        }

        const pipes = documentation.pipes.filter(
          (c) => c.name.indexOf(query) > -1
        );
        if (pipes) {
          results.push({ type: 'pipes', results: components });
        }

        return results;
      })
    );
  }
}
