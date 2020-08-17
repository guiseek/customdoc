import { createMockFor } from '@customdoc/util/testing';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  beforeEach(() => {
    component = createMockFor(SearchComponent)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
