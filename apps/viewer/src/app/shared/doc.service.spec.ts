import { createMockFor } from '@customdoc/util/testing';
import { DocService } from './doc.service';

describe('DocService', () => {
  let service: DocService;

  beforeEach(() => {
    service = createMockFor(DocService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
