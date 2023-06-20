import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailVenteEmployeComponent } from './detail-vente-employe.component';

describe('DetailVenteEmployeComponent', () => {
  let component: DetailVenteEmployeComponent;
  let fixture: ComponentFixture<DetailVenteEmployeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailVenteEmployeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailVenteEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
