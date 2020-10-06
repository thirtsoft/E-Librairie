import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVenteComponent } from './view-vente.component';

describe('ViewVenteComponent', () => {
  let component: ViewVenteComponent;
  let fixture: ComponentFixture<ViewVenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
