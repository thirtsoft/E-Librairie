import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommandeOfUserComponent } from './list-commande-of-user.component';

describe('ListCommandeOfUserComponent', () => {
  let component: ListCommandeOfUserComponent;
  let fixture: ComponentFixture<ListCommandeOfUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCommandeOfUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCommandeOfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
