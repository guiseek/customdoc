import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CompodocViewer } from '@customdoc/common/compodoc-viewer';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

export type Doc = CompodocViewer.Project;

@Injectable()
export class DocService {
  constructor(private http: HttpClient,
    @Inject('docs') private docs: Doc[]) {}

  getDocs() {
    return from([this.docs]);
  }
  findByName(name: string) {
    return this.getDocs().pipe(
      map((docs) => docs.find((doc) => doc.name === name))
    );
  }
  findByPath(path: string) {
    return this.findByName(
      this.normalizeName(path)
    );
  }
  getDoc({ url }: Pick<Doc, 'url'>) {
    return this.http.get<CompodocViewer.Compodoc>(url);
  }
  private normalizeName(value: string) {
    return value.split('/')[2];
  }
}
