import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Component, ComponentRef, EmbeddedViewRef, ViewChild } from '@angular/core';

@Component({
  selector: 'markdown-tool',
  template: `<ng-container cdkPortalOutlet></ng-container>`,
  styles: [`
    :host {
      display: flex;
      min-width: 200px;
      min-height: 200px;
      flex-flow: column;
      position: relative;
      border-radius: 4px;
      box-shadow: 0 4px 8px 0 rgba(51, 60, 78, 0.15);
      overflow: hidden;
    }
  `]
})
export class MarkdownToolbarContainer  extends BasePortalOutlet {
  @ViewChild(CdkPortalOutlet, { static: true }) portalOutlet: CdkPortalOutlet;
  
  attachComponentPortal<T>(componentPortal: ComponentPortal<any>): ComponentRef<T> {
    return this.portalOutlet.attachComponentPortal(componentPortal);
  }

  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    return this.portalOutlet.attachTemplatePortal(portal);
  }
}
