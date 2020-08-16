import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputClassComponent } from './output-class.component';

describe('OutputClassComponent', () => {
  let component: OutputClassComponent;
  let fixture: ComponentFixture<OutputClassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OutputClassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutputClassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
