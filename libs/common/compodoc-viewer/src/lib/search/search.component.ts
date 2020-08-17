import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { debounceTime, filter, map, switchMap } from 'rxjs/operators';
import { CompodocResult } from './search.interfaces';
import { clearToSearch } from '@customdoc/util/formatting';
import { Observable } from 'rxjs';
import { CompodocViewer } from '../compodoc-viewer.interfaces';

const searchInProperties = [
  'name',
  'file',
  'type',
  'selector',
  'description',
  'sourceCode',
  'templateData',
];

const searchInValues = (
  data: CompodocViewer.Compodoc,
  layer: keyof CompodocViewer.Compodoc,
  query = ''
) => {
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
  @Input() project: CompodocViewer.Project;
  @Input() url: string;
  @Input() documentation$: Observable<CompodocViewer.Compodoc>;

  filteredDocumentation$: Observable<CompodocResult[]>;

  searchControl = new FormControl('', [Validators.minLength(1)]);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    if (!this.project.url || !this.project.name) {
      throw new Error('Informe o project da documentação.');
    }
    this.listenCompodocSearch();
  }

  listenCompodocSearch() {
    this.filteredDocumentation$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      filter((v) => v && (v as string).length > 1),
      switchMap((value) => this.filterDocumentation(value as string))
    );
  }
  filterDocumentation(rawQuery = ''): Observable<CompodocResult[]> {
    const query = clearToSearch(rawQuery);

    return this.http.get<CompodocViewer.Compodoc>(this.project.url).pipe(
      map((documentation) => {
        // Podemos filtrar mais de 1 projeto futuramente
        const results = [];

        const search = ({ name }) => clearToSearch(name).indexOf(query) > -1;

        results.push({
          type: 'interfaces',
          results: documentation.interfaces.filter(search),
        });

        results.push({
          type: 'components',
          results: documentation.components.filter(search),
        });

        results.push({
          type: 'directives',
          results: documentation.directives.filter(search),
        });

        results.push({
          type: 'injectables',
          results: documentation.injectables.filter(search),
        });

        results.push({
          type: 'modules',
          results: documentation.modules.filter(search),
        });

        results.push({
          type: 'pipes',
          results: documentation.pipes.filter(search),
        });

        return results;
      })
    );
  }
}
