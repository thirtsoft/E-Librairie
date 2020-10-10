import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListChargeComponent } from './list-charge.component';

describe('ListChargeComponent', () => {
  let component: ListChargeComponent;
  let fixture: ComponentFixture<ListChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
