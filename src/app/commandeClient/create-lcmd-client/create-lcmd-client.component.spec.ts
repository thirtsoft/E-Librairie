import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLcmdClientComponent } from './create-lcmd-client.component';

describe('CreateLcmdClientComponent', () => {
  let component: CreateLcmdClientComponent;
  let fixture: ComponentFixture<CreateLcmdClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLcmdClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLcmdClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
