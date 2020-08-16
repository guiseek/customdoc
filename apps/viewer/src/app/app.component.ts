import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'customdoc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'viewer';
  compodoc$: Observable<Object>;
  doc = '/compodoc/common-compodoc-viewer/documentation.json';
  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.compodoc$ = this.http.get(this.doc);
  }
  onChange(item?) {
    console.log(item);
    
  }
}
