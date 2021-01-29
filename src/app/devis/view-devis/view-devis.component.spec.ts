import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDevisComponent } from './view-devis.component';

describe('ViewDevisComponent', () => {
  let component: ViewDevisComponent;
  let fixture: ComponentFixture<ViewDevisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDevisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
