import { createMockFor } from '@customdoc/util/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  beforeEach(() => {
    component = createMockFor(HomeComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
