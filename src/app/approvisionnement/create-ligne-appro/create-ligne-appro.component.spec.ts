import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLigneApproComponent } from './create-ligne-appro.component';

describe('CreateLigneApproComponent', () => {
  let component: CreateLigneApproComponent;
  let fixture: ComponentFixture<CreateLigneApproComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLigneApproComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLigneApproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
