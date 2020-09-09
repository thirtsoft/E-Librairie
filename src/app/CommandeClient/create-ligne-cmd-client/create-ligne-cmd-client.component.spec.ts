import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLigneCmdClientComponent } from './create-ligne-cmd-client.component';

describe('CreateLigneCmdClientComponent', () => {
  let component: CreateLigneCmdClientComponent;
  let fixture: ComponentFixture<CreateLigneCmdClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateLigneCmdClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLigneCmdClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
