import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListApproOfUserComponent } from './list-appro-of-user.component';

describe('ListApproOfUserComponent', () => {
  let component: ListApproOfUserComponent;
  let fixture: ComponentFixture<ListApproOfUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListApproOfUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListApproOfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
