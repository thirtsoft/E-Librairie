import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHistoriqueCommandeComponent } from './list-historique-commande.component';

describe('ListHistoriqueCommandeComponent', () => {
  let component: ListHistoriqueCommandeComponent;
  let fixture: ComponentFixture<ListHistoriqueCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHistoriqueCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHistoriqueCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
