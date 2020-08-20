import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { CompodocViewer, CompodocViewerService } from '@customdoc/common/compodoc-viewer';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { Doc, DocService } from './shared/doc.service';

@Component({
  selector: 'customdoc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Custom Doc';

  form = new FormGroup({
    project: new FormControl('', Validators.required),
  });
  get project() { return this.form.get('project'); }

  docs$: Observable<Doc[]>;

  constructor(
    private doc: DocService,
    private router: Router,
    private compodoc: CompodocViewerService
  ) {
    this.compodoc.currentProject$.subscribe(console.log)
    this.router.events
      .pipe(
        filter((nav) => nav instanceof NavigationEnd && !!nav.id),
        switchMap(({ url }: NavigationEnd) => this.doc.findByPath(url))
      )
      .subscribe((project) => this.patchProject(project));
  }

  ngOnInit() {
    this.docs$ = this.doc.getDocs();
  }
  patchProject(project: CompodocViewer.Project) {
    this.form.patchValue({ project });
    this.compodoc.setProject(project);
  }
  goTo(project: CompodocViewer.Project) {
    if (project.name) {
      this.router.navigate(['project', project.name]);
    }
  }
  log(obj: unknown) {
    console.log(obj);
  }
}
