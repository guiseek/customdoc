import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompodocViewer } from '../compodoc-viewer.interfaces';
import { CompodocEntry, CompodocSection } from './sidenav.interfaces';

@Component({
  selector: 'compodoc-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Input() project: CompodocViewer.Project;
  
  @Output() itemChange = new EventEmitter();

  public navigation: CompodocSection[] = [];
  private _documentation: CompodocViewer.Compodoc;
  @Input() set documentation(doc: CompodocViewer.Compodoc) {
    this._documentation = doc;
    if (doc) {
      this.navigation = Object.entries(doc)
        .filter(([_, v]) => Array.isArray(v))
        .map(([section, items]: CompodocEntry) => ({ section, items }));
    }
  }
  get documentation(): CompodocViewer.Compodoc {
    return this._documentation;
  }

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
