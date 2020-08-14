import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarEditorSelectComponent } from './toolbar-editor-select.component';

describe('ToolbarEditorSelectComponent', () => {
  let component: ToolbarEditorSelectComponent;
  let fixture: ComponentFixture<ToolbarEditorSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarEditorSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarEditorSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
