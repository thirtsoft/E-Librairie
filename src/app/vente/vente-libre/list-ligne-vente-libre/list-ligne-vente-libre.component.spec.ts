import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLigneVenteLibreComponent } from './list-ligne-vente-libre.component';

describe('ListLigneVenteLibreComponent', () => {
  let component: ListLigneVenteLibreComponent;
  let fixture: ComponentFixture<ListLigneVenteLibreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLigneVenteLibreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLigneVenteLibreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
