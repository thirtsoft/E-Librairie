import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVenteComponent } from './create-vente.component';

describe('CreateVenteComponent', () => {
  let component: CreateVenteComponent;
  let fixture: ComponentFixture<CreateVenteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVenteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
