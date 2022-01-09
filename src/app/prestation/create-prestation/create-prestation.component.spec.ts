import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePrestationComponent } from './create-prestation.component';

describe('CreatePrestationComponent', () => {
  let component: CreatePrestationComponent;
  let fixture: ComponentFixture<CreatePrestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePrestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
