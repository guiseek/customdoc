import { Component, Input, OnInit } from '@angular/core';
import { CompodocSection } from '../sidenav.interfaces';

@Component({
  selector: 'compodoc-sidenav-section',
  templateUrl: './sidenav-section.component.html',
  styleUrls: ['./sidenav-section.component.scss']
})
export class SidenavSectionComponent implements OnInit {
  @Input() nav: CompodocSection;

  constructor() { }

  ngOnInit(): void {
  }

}
