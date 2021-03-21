import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartStockComponent } from './piechart-stock.component';

describe('PiechartStockComponent', () => {
  let component: PiechartStockComponent;
  let fixture: ComponentFixture<PiechartStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiechartStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiechartStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
