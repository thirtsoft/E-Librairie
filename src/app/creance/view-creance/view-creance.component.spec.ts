import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCreanceComponent } from './view-creance.component';

describe('ViewCreanceComponent', () => {
  let component: ViewCreanceComponent;
  let fixture: ComponentFixture<ViewCreanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCreanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCreanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
