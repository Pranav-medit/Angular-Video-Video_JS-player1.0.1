import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionAttachFileComponent } from './action-attach-file.component';

describe('ActionAttachFileComponent', () => {
  let component: ActionAttachFileComponent;
  let fixture: ComponentFixture<ActionAttachFileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionAttachFileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionAttachFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
