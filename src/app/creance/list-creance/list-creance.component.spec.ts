import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCreanceComponent } from './list-creance.component';

describe('ListCreanceComponent', () => {
  let component: ListCreanceComponent;
  let fixture: ComponentFixture<ListCreanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCreanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCreanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
