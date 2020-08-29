import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAvoirComponent } from './create-avoir.component';

describe('CreateAvoirComponent', () => {
  let component: CreateAvoirComponent;
  let fixture: ComponentFixture<CreateAvoirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateAvoirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAvoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
