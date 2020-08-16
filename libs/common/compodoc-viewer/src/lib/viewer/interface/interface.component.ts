import { Component, Input, OnInit } from '@angular/core';
import { CompodocViewer } from '../../compodoc-viewer.interfaces';

@Component({
  selector: 'compodoc-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss']
})
export class InterfaceComponent implements OnInit {
  @Input() doc: CompodocViewer.Interface;
  constructor() { }

  ngOnInit(): void {
  }

}
