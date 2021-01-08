import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailFournisseurComponent } from './email-fournisseur.component';

describe('EmailFournisseurComponent', () => {
  let component: EmailFournisseurComponent;
  let fixture: ComponentFixture<EmailFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
