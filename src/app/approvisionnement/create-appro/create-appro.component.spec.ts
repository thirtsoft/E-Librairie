import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateApproComponent } from './create-appro.component';

describe('CreateApproComponent', () => {
  let component: CreateApproComponent;
  let fixture: ComponentFixture<CreateApproComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateApproComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateApproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
