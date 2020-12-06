import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewVersementComponent } from './view-versement.component';

describe('ViewVersementComponent', () => {
  let component: ViewVersementComponent;
  let fixture: ComponentFixture<ViewVersementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewVersementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewVersementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
