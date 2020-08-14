import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarEditorRowComponent } from './toolbar-editor-row.component';

describe('ToolbarEditorRowComponent', () => {
  let component: ToolbarEditorRowComponent;
  let fixture: ComponentFixture<ToolbarEditorRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarEditorRowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarEditorRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
