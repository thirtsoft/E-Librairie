import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeAvecCompteComponent } from './employe-avec-compte.component';

describe('EmployeAvecCompteComponent', () => {
  let component: EmployeAvecCompteComponent;
  let fixture: ComponentFixture<EmployeAvecCompteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeAvecCompteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeAvecCompteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
