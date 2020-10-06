import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApprovisionnementComponent } from './view-approvisionnement.component';

describe('ViewApprovisionnementComponent', () => {
  let component: ViewApprovisionnementComponent;
  let fixture: ComponentFixture<ViewApprovisionnementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewApprovisionnementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewApprovisionnementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
