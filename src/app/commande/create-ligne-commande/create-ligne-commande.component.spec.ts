import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLigneCommandeComponent } from './create-ligne-commande.component';

describe('CreateLigneCommandeComponent', () => {
  let component: CreateLigneCommandeComponent;
  let fixture: ComponentFixture<CreateLigneCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLigneCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLigneCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
