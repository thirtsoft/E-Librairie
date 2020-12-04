import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategorieChargeComponent } from './create-categorie-charge.component';

describe('CreateCategorieChargeComponent', () => {
  let component: CreateCategorieChargeComponent;
  let fixture: ComponentFixture<CreateCategorieChargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCategorieChargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategorieChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
