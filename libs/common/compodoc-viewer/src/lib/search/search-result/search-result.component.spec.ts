import { createMockFor } from '@customdoc/util/testing';
import { SearchResultComponent } from './index';

describe('SearchResultComponent', () => {
  let component: SearchResultComponent;

  beforeEach(() => {
    component = createMockFor(SearchResultComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
