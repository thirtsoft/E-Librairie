import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCmdClientComponent } from './create-cmd-client.component';

describe('CreateCmdClientComponent', () => {
  let component: CreateCmdClientComponent;
  let fixture: ComponentFixture<CreateCmdClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCmdClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCmdClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
