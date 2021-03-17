import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcharCommandeComponent } from './barchar-commande.component';

describe('BarcharCommandeComponent', () => {
  let component: BarcharCommandeComponent;
  let fixture: ComponentFixture<BarcharCommandeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcharCommandeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcharCommandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
