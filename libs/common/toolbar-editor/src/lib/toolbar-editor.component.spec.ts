import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarEditorComponent } from './toolbar-editor.component';

describe('ToolbarEditorComponent', () => {
  let component: ToolbarEditorComponent;
  let fixture: ComponentFixture<ToolbarEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
