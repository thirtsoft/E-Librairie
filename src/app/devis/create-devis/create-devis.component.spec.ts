import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDevisComponent } from './create-devis.component';

describe('CreateDevisComponent', () => {
  let component: CreateDevisComponent;
  let fixture: ComponentFixture<CreateDevisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDevisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
