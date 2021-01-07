import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoiEmailEmployeComponent } from './envoi-email-employe.component';

describe('EnvoiEmailEmployeComponent', () => {
  let component: EnvoiEmailEmployeComponent;
  let fixture: ComponentFixture<EnvoiEmailEmployeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvoiEmailEmployeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvoiEmailEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
