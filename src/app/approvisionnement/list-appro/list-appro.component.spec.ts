import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListApproComponent } from './list-appro.component';

describe('ListApproComponent', () => {
  let component: ListApproComponent;
  let fixture: ComponentFixture<ListApproComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListApproComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListApproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
