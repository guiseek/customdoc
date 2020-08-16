import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';
import { compodoc, CompodocResult } from './search.interfaces';
import { clearToSearch } from '@customdoc/util/formatting';
import { Observable } from 'rxjs';

const searchInProperties = [
  'name',
  'file',
  'type',
  'selector',
  'description',
  'sourceCode',
  'templateData',
];

const searchInValues = (data: compodoc, layer: keyof compodoc, query = '') => {
  return Object.keys(data).filter((k) =>
    searchInProperties.includes(k)
      ? clearToSearch(data[layer].toString()).indexOf(clearToSearch(query)) > -1
      : []
  );
};

@Component({
  selector: 'compodoc-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() url: string;
  @Input() documentation$: Observable<compodoc>;

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
  filterDocumentation(rawQuery = ''): Observable<CompodocResult[]> {
    const query = clearToSearch(rawQuery);

    return this.http.get<compodoc>(this.url).pipe(
      map((documentation) => {

        const results = [];

        const interfaces = documentation.interfaces.filter(
          (d) => clearToSearch(d.name).indexOf(query) > -1
        );
        if (interfaces) {
          results.push({ type: 'interfaces', results: interfaces });
        }

        const components = documentation.components.filter(
          (d) => clearToSearch(d.name).indexOf(query) > -1
        );
        if (components) {
          results.push({ type: 'components', results: components });
        }

        const directives = documentation.directives.filter(
          (d) => clearToSearch(d.name).indexOf(query) > -1
        );
        if (directives) {
          results.push({ type: 'directives', results: components });
        }

        const modules = documentation.modules.filter(
          (d) => clearToSearch(d.name).indexOf(query) > -1
        );
        if (modules) {
          results.push({ type: 'modules', results: components });
        }

        const pipes = documentation.pipes.filter(
          (d) => clearToSearch(d.name).indexOf(query) > -1
        );
        if (pipes) {
          results.push({ type: 'pipes', results: components });
        }

        return results;
      })
    );
  }
}
