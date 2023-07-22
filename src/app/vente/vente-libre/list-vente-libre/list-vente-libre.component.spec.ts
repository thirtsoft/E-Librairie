import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVenteLibreComponent } from './list-vente-libre.component';

describe('ListVenteLibreComponent', () => {
  let component: ListVenteLibreComponent;
  let fixture: ComponentFixture<ListVenteLibreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVenteLibreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVenteLibreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
