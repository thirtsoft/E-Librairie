import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLigneCmdClientComponent } from './list-ligne-cmd-client.component';

describe('ListLigneCmdClientComponent', () => {
  let component: ListLigneCmdClientComponent;
  let fixture: ComponentFixture<ListLigneCmdClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLigneCmdClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLigneCmdClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
