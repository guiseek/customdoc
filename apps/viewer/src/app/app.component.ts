import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'docentro-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'viewer';
  compodoc$: Observable<Object>;
  
  constructor(
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.compodoc$ = this.http.get(
      '/compodoc/common-split-content/documentation.json'
    );
  }
  onChange(item?) {
    console.log(item);
    
  }
}
