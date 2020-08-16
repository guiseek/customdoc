import { Component, Input, OnInit } from '@angular/core';
import { CompodocResult, valueof } from '../search.interfaces';

@Component({
  selector: 'compodoc-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  @Input() doc: CompodocResult;
  constructor() { }

  ngOnInit(): void {
  
  }

}
