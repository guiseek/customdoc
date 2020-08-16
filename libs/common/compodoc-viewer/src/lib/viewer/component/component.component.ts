import { Component, Input, OnInit } from '@angular/core';
import { CompodocViewer } from '../../compodoc-viewer.interfaces';

@Component({
  selector: 'compodoc-component',
  templateUrl: './component.component.html',
  styleUrls: ['./component.component.scss']
})
export class ComponentComponent implements OnInit {
  @Input() doc: CompodocViewer.Component;
  constructor() { }

  ngOnInit(): void {
  }

}
