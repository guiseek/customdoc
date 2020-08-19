import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Component, ComponentRef, EmbeddedViewRef, ViewChild } from '@angular/core';

@Component({
  selector: 'markdown-tool',
  template: `
    <ng-container cdkPortalOutlet></ng-container>
    <div class="arrow" markdownToolbarArrow></div>
  `,
  styles: [`
    :host {
      display: flex;
      flex-flow: column;
      min-width: 64px;
      min-height: 32px;
      position: relative;
      border-radius: 4px;
      box-shadow: 0 4px 8px 0 rgba(51, 60, 78, 0.15);
      background: white;
    }
    .arrow {
      background-color: #444;
      position: absolute;
      z-index: -1;
    }

    :host-context(.center) .arrow {
      left: 50%;
    }

    :host-context(.top.left, .top.center) .arrow {
      transform-origin: top left;
      transform: rotate(45deg);
    }

    :host-context(.top.right) .arrow {
      transform-origin: top right;
      transform: rotate(-45deg);
    }

    :host-context(.bottom.left, .bottom.center) .arrow {
      transform-origin: bottom left;
      transform: rotate(-45deg);
    }

    :host-context(.bottom.right) .arrow {
      transform-origin: bottom right;
      transform: rotate(45deg);
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
