import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationLigneVenteLibreComponent } from './creation-ligne-vente-libre.component';

describe('CreationLigneVenteLibreComponent', () => {
  let component: CreationLigneVenteLibreComponent;
  let fixture: ComponentFixture<CreationLigneVenteLibreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationLigneVenteLibreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationLigneVenteLibreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
