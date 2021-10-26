import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHistoriqueLoginComponent } from './list-historique-login.component';

describe('ListHistoriqueLoginComponent', () => {
  let component: ListHistoriqueLoginComponent;
  let fixture: ComponentFixture<ListHistoriqueLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHistoriqueLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHistoriqueLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
