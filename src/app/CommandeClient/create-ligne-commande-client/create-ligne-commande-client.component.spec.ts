import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLigneCommandeClientComponent } from './create-ligne-commande-client.component';

describe('CreateLigneCommandeClientComponent', () => {
  let component: CreateLigneCommandeClientComponent;
  let fixture: ComponentFixture<CreateLigneCommandeClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLigneCommandeClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLigneCommandeClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
