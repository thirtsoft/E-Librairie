import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcharCreanceComponent } from './barchar-creance.component';

describe('BarcharCreanceComponent', () => {
  let component: BarcharCreanceComponent;
  let fixture: ComponentFixture<BarcharCreanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcharCreanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcharCreanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
