import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefautLayoutComponent } from './defaut-layout.component';

describe('DefautLayoutComponent', () => {
  let component: DefautLayoutComponent;
  let fixture: ComponentFixture<DefautLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefautLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefautLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
