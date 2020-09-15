import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVenteComponent } from './list-vente.component';

describe('ListVenteComponent', () => {
  let component: ListVenteComponent;
  let fixture: ComponentFixture<ListVenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
