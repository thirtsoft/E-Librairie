import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLigneVenteComponent } from './list-ligne-vente.component';

describe('ListLigneVenteComponent', () => {
  let component: ListLigneVenteComponent;
  let fixture: ComponentFixture<ListLigneVenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLigneVenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLigneVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
