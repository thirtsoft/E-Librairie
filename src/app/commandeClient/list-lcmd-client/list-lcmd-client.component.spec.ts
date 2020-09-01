import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLcmdClientComponent } from './list-lcmd-client.component';

describe('ListLcmdClientComponent', () => {
  let component: ListLcmdClientComponent;
  let fixture: ComponentFixture<ListLcmdClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLcmdClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLcmdClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
