import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompodocViewer } from '../compodoc-viewer.interfaces';

// type valueof<T> = T[keyof T];
// export type CompodocSections = keyof CompodocViewer.Compodoc;
export interface CompodocSection {
  name: string;
  id: string;
  file: string;
}
type CompodocEntries = [keyof CompodocViewer.Compodoc, CompodocSection[]];

export interface CompodocNavigation {
  section: keyof CompodocViewer.Compodoc;
  items: CompodocSection[];
}

@Component({
  selector: 'compodoc-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {

  @Output() itemChange = new EventEmitter();

  public navigation: CompodocNavigation[] = [];
  private _documentation: CompodocViewer.Compodoc;
  @Input() set documentation(doc: CompodocViewer.Compodoc) {
    this._documentation = doc;
    if (doc) {
      this.navigation = Object.entries(doc).filter(([key, values]) => Array.isArray(values)).map(
        ([key, values]: CompodocEntries) => {
          return {
            section: key,
            items: values
            // items: values.map(({ file, id, name }) => ({ file, id, name })),
          };
        }
      );
    }
  }
  get documentation(): CompodocViewer.Compodoc {
    return this._documentation;
  }
  // sections
  constructor() {}

  ngOnInit(): void {
    if (this.documentation) {
      console.log(this.documentation);
      const sections = Object.entries(this.documentation).map(
        ([key, values]) => {
          console.log(key);
        }
      );
      console.log(sections);
    }
  }
}
