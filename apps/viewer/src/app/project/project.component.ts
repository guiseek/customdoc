import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompodocViewer } from '@customdoc/common/compodoc-viewer';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DocService } from '../shared/doc.service';

@Component({
  selector: 'customdoc-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  project$: Observable<CompodocViewer.Project>;
  compodoc$: Observable<CompodocViewer.Compodoc>;
  constructor(
    private doc: DocService,
    private route: ActivatedRoute
  ) {
    this.project$ = this.route.params.pipe(
      switchMap(({ project }) => this.doc.findByName(project))
    );
  }

  ngOnInit(): void {
    this.compodoc$ = this.project$.pipe(
      switchMap((project) => this.doc.getDoc(project))
    );
  }
}
