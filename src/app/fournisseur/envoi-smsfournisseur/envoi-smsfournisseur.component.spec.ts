import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoiSMSFournisseurComponent } from './envoi-smsfournisseur.component';

describe('EnvoiSMSFournisseurComponent', () => {
  let component: EnvoiSMSFournisseurComponent;
  let fixture: ComponentFixture<EnvoiSMSFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvoiSMSFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvoiSMSFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
