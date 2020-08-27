import { PaginatorStoreModule, PaginatorComponent } from '@customdoc/paginator-store';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, DoBootstrap, Injector, Type } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';

function create(component: Type<any>, injector: Injector) {
  return createCustomElement(component, { injector });
}

@NgModule({
  imports: [BrowserModule, PaginatorStoreModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector) {}
  ngDoBootstrap() {
    customElements.define('paginator-store',
      create(PaginatorComponent, this.injector)
    );
  }
}
