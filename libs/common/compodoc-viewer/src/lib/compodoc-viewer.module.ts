import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [SidenavComponent, SourceCodeComponent, InputClassComponent, ComponentComponent, DirectiveComponent, InterfaceComponent, ClassComponent, OutputClassComponent, PropertyClassComponent, MethodClassComponent, ModuleComponent, SidenavSectionComponent],
  exports: [SidenavComponent, SourceCodeComponent, InputClassComponent, ComponentComponent, DirectiveComponent, InterfaceComponent, ClassComponent, OutputClassComponent, PropertyClassComponent, MethodClassComponent, ModuleComponent, SidenavSectionComponent],
})
export class CompodocViewerModule {}
