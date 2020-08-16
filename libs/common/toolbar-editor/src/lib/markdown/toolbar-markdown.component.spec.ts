import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarMarkdownComponent } from './toolbar-markdown.component';

describe('ToolbarMarkdownComponent', () => {
  let component: ToolbarMarkdownComponent;
  let fixture: ComponentFixture<ToolbarMarkdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarMarkdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarMarkdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
