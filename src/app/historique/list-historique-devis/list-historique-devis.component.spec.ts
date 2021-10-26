import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHistoriqueDevisComponent } from './list-historique-devis.component';

describe('ListHistoriqueDevisComponent', () => {
  let component: ListHistoriqueDevisComponent;
  let fixture: ComponentFixture<ListHistoriqueDevisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHistoriqueDevisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHistoriqueDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
