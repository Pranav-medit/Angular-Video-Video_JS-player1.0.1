import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionRecordComponent } from './action-record.component';

describe('ActionRecordComponent', () => {
  let component: ActionRecordComponent;
  let fixture: ComponentFixture<ActionRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
