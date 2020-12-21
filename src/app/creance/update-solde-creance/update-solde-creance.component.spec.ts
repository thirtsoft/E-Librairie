import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSoldeCreanceComponent } from './update-solde-creance.component';

describe('UpdateSoldeCreanceComponent', () => {
  let component: UpdateSoldeCreanceComponent;
  let fixture: ComponentFixture<UpdateSoldeCreanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSoldeCreanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSoldeCreanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
