import { Component } from '@angular/core';
import { createHostFactory, SpectatorHost } from '@ngneat/spectator/jest';

import { PaginatorComponent } from './paginator.component';

@Component({ template: `
  
`})
class CustomHostComponent {
  length = 100;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];
  log(obj: unknown) {
    console.log(obj);
  }
}

const template = `
  <paginator-store
    [length]="length"
    [pageSize]="pageSize"
    [pageSizeOptions]="pageSizeOptions"
    (page)="log($event)"
  >
  </paginator-store>
`;

describe('PaginatorComponent', () => {
  let host: SpectatorHost<PaginatorComponent, CustomHostComponent>;
  const createHost = createHostFactory({
    component: PaginatorComponent,
    host: CustomHostComponent
  });

  it('should display the host component title', async () => {
    host = createHost(template);
    const prevButton = host.query<HTMLButtonElement>('.paginator-navigation-previous');
    
    spyOn(host.component, 'page')
    expect(prevButton?.disabled).toBeTruthy();
  });
});
