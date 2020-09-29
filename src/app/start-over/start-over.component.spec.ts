import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartOverComponent } from './start-over.component';

describe('StartOverComponent', () => {
  let component: StartOverComponent;
  let fixture: ComponentFixture<StartOverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartOverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartOverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
