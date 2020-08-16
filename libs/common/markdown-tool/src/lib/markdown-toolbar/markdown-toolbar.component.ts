import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Component, ComponentRef, EmbeddedViewRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'markdown-toolbar',
  // template: `<ng-container cdkPortalOutlet></ng-container>`,
  templateUrl: './markdown-toolbar.component.html',
  styleUrls: ['./markdown-toolbar.component.scss']
})
export class MarkdownToolbarComponent  extends BasePortalOutlet {
  @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet: CdkPortalOutlet;

  attachComponentPortal<T>(componentPortal: ComponentPortal<any>): ComponentRef<T> {
    return this.portalOutlet.attachComponentPortal(componentPortal);
  }

  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    return this.portalOutlet.attachTemplatePortal(portal);
  }
}
