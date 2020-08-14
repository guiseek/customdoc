import { TestBed } from '@angular/core/testing';

import { ToolbarEditorService } from './toolbar-editor.service';

describe('ToolbarEditorService', () => {
  let service: ToolbarEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToolbarEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
