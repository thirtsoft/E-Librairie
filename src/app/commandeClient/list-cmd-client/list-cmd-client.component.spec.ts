import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCmdClientComponent } from './list-cmd-client.component';

describe('ListCmdClientComponent', () => {
  let component: ListCmdClientComponent;
  let fixture: ComponentFixture<ListCmdClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCmdClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCmdClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
