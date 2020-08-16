import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SidenavComponent, SidenavSectionComponent } from './sidenav';
import { SearchComponent, SearchResultComponent } from './search';

import {
  MethodClassComponent,
  PropertyClassComponent,
  OutputClassComponent,
  SourceCodeComponent,
  InputClassComponent,
} from './views';
import {
  ModuleComponent,
  ClassComponent,
  InterfaceComponent,
  DirectiveComponent,
  ComponentComponent,
} from './viewer';

@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule, ReactiveFormsModule],
  declarations: [
    SidenavComponent,
    SourceCodeComponent,
    InputClassComponent,
    ComponentComponent,
    DirectiveComponent,
    InterfaceComponent,
    ClassComponent,
    OutputClassComponent,
    PropertyClassComponent,
    MethodClassComponent,
    ModuleComponent,
    SidenavSectionComponent,
    SearchComponent,
    SearchResultComponent,
  ],
  exports: [
    SidenavComponent,
    SourceCodeComponent,
    InputClassComponent,
    ComponentComponent,
    DirectiveComponent,
    InterfaceComponent,
    ClassComponent,
    OutputClassComponent,
    PropertyClassComponent,
    MethodClassComponent,
    ModuleComponent,
    SidenavSectionComponent,
    SearchComponent,
    SearchResultComponent,
  ],
})
export class CompodocViewerModule {}
