import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCreanceOfUserComponent } from './list-creance-of-user.component';

describe('ListCreanceOfUserComponent', () => {
  let component: ListCreanceOfUserComponent;
  let fixture: ComponentFixture<ListCreanceOfUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCreanceOfUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCreanceOfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
