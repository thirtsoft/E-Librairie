import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVente2Component } from './view-vente2.component';

describe('ViewVente2Component', () => {
  let component: ViewVente2Component;
  let fixture: ComponentFixture<ViewVente2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVente2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVente2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
