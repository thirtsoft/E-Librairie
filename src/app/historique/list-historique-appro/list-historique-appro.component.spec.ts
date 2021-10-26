import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHistoriqueApproComponent } from './list-historique-appro.component';

describe('ListHistoriqueApproComponent', () => {
  let component: ListHistoriqueApproComponent;
  let fixture: ComponentFixture<ListHistoriqueApproComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHistoriqueApproComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHistoriqueApproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
