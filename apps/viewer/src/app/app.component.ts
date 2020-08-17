import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { CompodocViewer } from '@customdoc/common/compodoc-viewer';
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

  constructor(private doc: DocService, private router: Router) {
    this.router.events
      .pipe(
        filter((nav) => nav instanceof NavigationEnd && !!nav.id),
        switchMap(({ url }: NavigationEnd) => this.doc.findByPath(url))
      )
      .subscribe((project) => this.form.setValue({ project }));
  }

  ngOnInit() {
    this.docs$ = this.doc.getDocs();
  }
  goTo(project: CompodocViewer.Project) {
    if (project.name) {
      this.router.navigate([project.name]);
    }
  }
}
