import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitContentComponent } from './split-content.component';

describe('SplitContentComponent', () => {
  let component: SplitContentComponent;
  let fixture: ComponentFixture<SplitContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
