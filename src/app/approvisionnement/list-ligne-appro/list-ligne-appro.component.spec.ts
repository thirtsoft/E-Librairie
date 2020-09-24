import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLigneApproComponent } from './list-ligne-appro.component';

describe('ListLigneApproComponent', () => {
  let component: ListLigneApproComponent;
  let fixture: ComponentFixture<ListLigneApproComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLigneApproComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLigneApproComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
