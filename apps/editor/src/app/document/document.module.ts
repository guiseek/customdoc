import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { DocumentRoutingModule } from './document-routing.module';
import { DocumentComponent } from './document.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarEditorModule } from '@customdoc/common/toolbar-editor';
import { SplitContentModule } from '@customdoc/common/split-content';

const routes: Routes = [
  { path: '', component: DocumentComponent }
];

@NgModule({
  declarations: [DocumentComponent],
  imports: [
    FormsModule,
    CommonModule,
    SplitContentModule,
    ReactiveFormsModule,
    ToolbarEditorModule,
    DocumentRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class DocumentModule { }
