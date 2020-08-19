import { Component, OnInit } from '@angular/core';
import { CompodocViewer, CompodocViewerService } from '@customdoc/common/compodoc-viewer';
import { Observable } from 'rxjs';

@Component({
  selector: 'customdoc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  docs$: Observable<CompodocViewer.Project[]>;
  constructor(private compodoc: CompodocViewerService) { }

  ngOnInit(): void {
    this.docs$ = this.compodoc.findDocs();
  }

}
