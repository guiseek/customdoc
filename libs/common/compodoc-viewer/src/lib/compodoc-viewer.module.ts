import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SidenavComponent } from './sidenav/sidenav.component';
import { SourceCodeComponent } from './source-code/source-code.component';
import { InputClassComponent } from './input-class/input-class.component';
import { ComponentComponent } from './component/component.component';
import { DirectiveComponent } from './directive/directive.component';
import { InterfaceComponent } from './interface/interface.component';
import { ClassComponent } from './class/class.component';
import { OutputClassComponent } from './output-class/output-class.component';
import { PropertyClassComponent } from './property-class/property-class.component';
import { MethodClassComponent } from './method-class/method-class.component';
import { ModuleComponent } from './module/module.component';
import { RouterModule } from '@angular/router';
import { SidenavSectionComponent } from './sidenav-section/sidenav-section.component';
import { SearchComponent } from './search/search.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, RouterModule, HttpClientModule, ReactiveFormsModule],
  declarations: [SidenavComponent, SourceCodeComponent, InputClassComponent, ComponentComponent, DirectiveComponent, InterfaceComponent, ClassComponent, OutputClassComponent, PropertyClassComponent, MethodClassComponent, ModuleComponent, SidenavSectionComponent, SearchComponent, SearchResultComponent],
  exports: [SidenavComponent, SourceCodeComponent, InputClassComponent, ComponentComponent, DirectiveComponent, InterfaceComponent, ClassComponent, OutputClassComponent, PropertyClassComponent, MethodClassComponent, ModuleComponent, SidenavSectionComponent, SearchComponent, SearchResultComponent],
})
export class CompodocViewerModule {}
