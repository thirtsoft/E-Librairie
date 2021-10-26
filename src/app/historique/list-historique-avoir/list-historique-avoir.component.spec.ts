import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHistoriqueAvoirComponent } from './list-historique-avoir.component';

describe('ListHistoriqueAvoirComponent', () => {
  let component: ListHistoriqueAvoirComponent;
  let fixture: ComponentFixture<ListHistoriqueAvoirComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHistoriqueAvoirComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHistoriqueAvoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
