import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHistoriqueCreanceComponent } from './list-historique-creance.component';

describe('ListHistoriqueCreanceComponent', () => {
  let component: ListHistoriqueCreanceComponent;
  let fixture: ComponentFixture<ListHistoriqueCreanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHistoriqueCreanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHistoriqueCreanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
