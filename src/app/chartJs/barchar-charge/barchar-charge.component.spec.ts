import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcharChargeComponent } from './barchar-charge.component';

describe('BarcharChargeComponent', () => {
  let component: BarcharChargeComponent;
  let fixture: ComponentFixture<BarcharChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcharChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcharChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
