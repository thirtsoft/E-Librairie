import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVenteJounalierComponent } from './list-vente-jounalier.component';

describe('ListVenteJounalierComponent', () => {
  let component: ListVenteJounalierComponent;
  let fixture: ComponentFixture<ListVenteJounalierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVenteJounalierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVenteJounalierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
