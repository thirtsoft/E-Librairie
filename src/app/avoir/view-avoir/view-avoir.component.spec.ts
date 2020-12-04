import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAvoirComponent } from './view-avoir.component';

describe('ViewAvoirComponent', () => {
  let component: ViewAvoirComponent;
  let fixture: ComponentFixture<ViewAvoirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewAvoirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAvoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
