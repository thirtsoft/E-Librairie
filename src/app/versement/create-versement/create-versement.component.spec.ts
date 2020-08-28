import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVersementComponent } from './create-versement.component';

describe('CreateVersementComponent', () => {
  let component: CreateVersementComponent;
  let fixture: ComponentFixture<CreateVersementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVersementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVersementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
