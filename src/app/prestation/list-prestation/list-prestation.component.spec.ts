import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPrestationComponent } from './list-prestation.component';

describe('ListPrestationComponent', () => {
  let component: ListPrestationComponent;
  let fixture: ComponentFixture<ListPrestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListPrestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPrestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
