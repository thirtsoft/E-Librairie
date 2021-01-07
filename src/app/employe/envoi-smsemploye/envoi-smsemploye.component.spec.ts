import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoiSMSEmployeComponent } from './envoi-smsemploye.component';

describe('EnvoiSMSEmployeComponent', () => {
  let component: EnvoiSMSEmployeComponent;
  let fixture: ComponentFixture<EnvoiSMSEmployeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvoiSMSEmployeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvoiSMSEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
