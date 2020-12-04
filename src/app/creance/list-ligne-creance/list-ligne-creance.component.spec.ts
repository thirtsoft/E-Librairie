import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLigneCreanceComponent } from './list-ligne-creance.component';

describe('ListLigneCreanceComponent', () => {
  let component: ListLigneCreanceComponent;
  let fixture: ComponentFixture<ListLigneCreanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLigneCreanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLigneCreanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
