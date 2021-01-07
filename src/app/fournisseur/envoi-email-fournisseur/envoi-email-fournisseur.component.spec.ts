import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoiEmailFournisseurComponent } from './envoi-email-fournisseur.component';

describe('EnvoiEmailFournisseurComponent', () => {
  let component: EnvoiEmailFournisseurComponent;
  let fixture: ComponentFixture<EnvoiEmailFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvoiEmailFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvoiEmailFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
