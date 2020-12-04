import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLigneCreanceComponent } from './create-ligne-creance.component';

describe('CreateLigneCreanceComponent', () => {
  let component: CreateLigneCreanceComponent;
  let fixture: ComponentFixture<CreateLigneCreanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLigneCreanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLigneCreanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
