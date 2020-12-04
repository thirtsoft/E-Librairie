import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListLigneAvoirComponent } from './list-ligne-avoir.component';

describe('ListLigneAvoirComponent', () => {
  let component: ListLigneAvoirComponent;
  let fixture: ComponentFixture<ListLigneAvoirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListLigneAvoirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListLigneAvoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
