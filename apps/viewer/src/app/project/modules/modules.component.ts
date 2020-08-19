import { Component, OnInit } from '@angular/core';
import { CompodocViewerService } from '@customdoc/common/compodoc-viewer';
import { DocService } from '../../shared/doc.service';

@Component({
  selector: 'customdoc-modules',
  templateUrl: './modules.component.html',
  styleUrls: ['./modules.component.scss'],
  providers: [CompodocViewerService]
})
export class ModulesComponent implements OnInit {
  modules$;
  constructor(private compodoc: CompodocViewerService) { }

  ngOnInit(): void {
    this.modules$ = this.compodoc.getDocs();
    console.log(this.modules$);
    
    this.compodoc.currentProject$.subscribe(console.log)
  }

}
