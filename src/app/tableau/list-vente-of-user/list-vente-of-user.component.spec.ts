import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVenteOfUserComponent } from './list-vente-of-user.component';

describe('ListVenteOfUserComponent', () => {
  let component: ListVenteOfUserComponent;
  let fixture: ComponentFixture<ListVenteOfUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVenteOfUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVenteOfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
