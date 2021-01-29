import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLigneDevisComponent } from './create-ligne-devis.component';

describe('CreateLigneDevisComponent', () => {
  let component: CreateLigneDevisComponent;
  let fixture: ComponentFixture<CreateLigneDevisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLigneDevisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLigneDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
