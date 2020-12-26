import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcharComVenteComponent } from './barchar-com-vente.component';

describe('BarcharComVenteComponent', () => {
  let component: BarcharComVenteComponent;
  let fixture: ComponentFixture<BarcharComVenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcharComVenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcharComVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
