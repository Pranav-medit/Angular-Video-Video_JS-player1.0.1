import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionButtonPluginComponent } from './action-button-plugin.component';

describe('ActionButtonPluginComponent', () => {
  let component: ActionButtonPluginComponent;
  let fixture: ComponentFixture<ActionButtonPluginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionButtonPluginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionButtonPluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
