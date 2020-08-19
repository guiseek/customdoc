import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { from, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CompodocViewer } from './compodoc-viewer.interfaces';

@Injectable({
  providedIn: 'root',
})
export class CompodocViewerService {
  _currentProject = new Subject<CompodocViewer.Project>();
  currentProject$ = this._currentProject.asObservable();

  project$: Observable<CompodocViewer.Project>;
  constructor(
    private http: HttpClient,
    @Inject('docs') private docs: CompodocViewer.Project[]
  ) { }

  setProject(project: CompodocViewer.Project) {
    this._currentProject.next(project);
  }

  getDocs() {
    return this.docs;
  }
  findDocs() {
    return from([this.docs]);
  }
  findByName(name: string) {
    return this.findDocs().pipe(
      map((docs) => docs.find((doc) => doc.name === name))
    );
  }
  findByPath(path: string) {
    return this.findByName(this.normalizeName(path));
  }
  getDoc({ url }) {
    return this.http.get<CompodocViewer.Compodoc>(url);
  }
  private normalizeName(value: string) {
    return value.split('/')[2];
  }
}
