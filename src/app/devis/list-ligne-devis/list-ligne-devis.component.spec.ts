import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLigneDevisComponent } from './list-ligne-devis.component';

describe('ListLigneDevisComponent', () => {
  let component: ListLigneDevisComponent;
  let fixture: ComponentFixture<ListLigneDevisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLigneDevisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLigneDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
