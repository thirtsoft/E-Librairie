import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLigneCmdClientComponent } from './edit-ligne-cmd-client.component';

describe('EditLigneCmdClientComponent', () => {
  let component: EditLigneCmdClientComponent;
  let fixture: ComponentFixture<EditLigneCmdClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditLigneCmdClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditLigneCmdClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
