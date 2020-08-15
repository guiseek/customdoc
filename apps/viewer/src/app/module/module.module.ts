import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { ModuleRoutingModule } from './module-routing.module';
import { ModuleComponent } from './module.component';

const routes: Routes = [
  { path: '', component: ModuleComponent }
];

@NgModule({
  declarations: [ModuleComponent],
  imports: [
    CommonModule,
    ModuleRoutingModule,
    RouterModule.forChild(routes)
  ]
})
export class ModuleModule { }
