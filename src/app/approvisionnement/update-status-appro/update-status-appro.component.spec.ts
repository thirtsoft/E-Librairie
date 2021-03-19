import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStatusApproComponent } from './update-status-appro.component';

describe('UpdateStatusApproComponent', () => {
  let component: UpdateStatusApproComponent;
  let fixture: ComponentFixture<UpdateStatusApproComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStatusApproComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStatusApproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
