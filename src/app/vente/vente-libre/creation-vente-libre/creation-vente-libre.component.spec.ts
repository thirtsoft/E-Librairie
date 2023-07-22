import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationVenteLibreComponent } from './creation-vente-libre.component';

describe('CreationVenteLibreComponent', () => {
  let component: CreationVenteLibreComponent;
  let fixture: ComponentFixture<CreationVenteLibreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreationVenteLibreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationVenteLibreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
