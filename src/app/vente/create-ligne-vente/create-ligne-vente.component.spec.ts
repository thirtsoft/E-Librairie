import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLigneVenteComponent } from './create-ligne-vente.component';

describe('CreateLigneVenteComponent', () => {
  let component: CreateLigneVenteComponent;
  let fixture: ComponentFixture<CreateLigneVenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLigneVenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLigneVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
