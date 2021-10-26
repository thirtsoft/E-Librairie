import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHistoriqueVenteComponent } from './list-historique-vente.component';

describe('ListHistoriqueVenteComponent', () => {
  let component: ListHistoriqueVenteComponent;
  let fixture: ComponentFixture<ListHistoriqueVenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHistoriqueVenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHistoriqueVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
