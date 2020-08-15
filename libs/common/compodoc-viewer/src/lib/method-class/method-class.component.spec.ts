import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodClassComponent } from './method-class.component';

describe('MethodClassComponent', () => {
  let component: MethodClassComponent;
  let fixture: ComponentFixture<MethodClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MethodClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
