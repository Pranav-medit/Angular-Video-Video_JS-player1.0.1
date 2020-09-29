import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionAddNotesComponent } from './action-add-notes.component';

describe('ActionAddNotesComponent', () => {
  let component: ActionAddNotesComponent;
  let fixture: ComponentFixture<ActionAddNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionAddNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionAddNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
