import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsVenteLibreComponent } from './details-vente-libre.component';

describe('DetailsVenteLibreComponent', () => {
  let component: DetailsVenteLibreComponent;
  let fixture: ComponentFixture<DetailsVenteLibreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsVenteLibreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsVenteLibreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
