import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMontantApproComponent } from './update-montant-appro.component';

describe('UpdateMontantApproComponent', () => {
  let component: UpdateMontantApproComponent;
  let fixture: ComponentFixture<UpdateMontantApproComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateMontantApproComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMontantApproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
