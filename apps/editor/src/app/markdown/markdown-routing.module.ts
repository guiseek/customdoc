import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MarkdownComponent } from './markdown.component';

const routes: Routes = [{ path: '', component: MarkdownComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarkdownRoutingModule { }
