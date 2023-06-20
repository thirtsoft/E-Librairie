import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteCreationComponent } from './vente-creation.component';

describe('VenteCreationComponent', () => {
  let component: VenteCreationComponent;
  let fixture: ComponentFixture<VenteCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenteCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenteCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
