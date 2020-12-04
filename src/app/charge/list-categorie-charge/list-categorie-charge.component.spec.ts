import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCategorieChargeComponent } from './list-categorie-charge.component';

describe('ListCategorieChargeComponent', () => {
  let component: ListCategorieChargeComponent;
  let fixture: ComponentFixture<ListCategorieChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCategorieChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCategorieChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
