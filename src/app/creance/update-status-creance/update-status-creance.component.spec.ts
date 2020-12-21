import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStatusCreanceComponent } from './update-status-creance.component';

describe('UpdateStatusCreanceComponent', () => {
  let component: UpdateStatusCreanceComponent;
  let fixture: ComponentFixture<UpdateStatusCreanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStatusCreanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStatusCreanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
