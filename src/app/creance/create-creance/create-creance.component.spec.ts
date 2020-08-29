import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCreanceComponent } from './create-creance.component';

describe('CreateCreanceComponent', () => {
  let component: CreateCreanceComponent;
  let fixture: ComponentFixture<CreateCreanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCreanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCreanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
