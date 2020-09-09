import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCommandeClientComponent } from './list-commande-client.component';

describe('ListCommandeClientComponent', () => {
  let component: ListCommandeClientComponent;
  let fixture: ComponentFixture<ListCommandeClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCommandeClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCommandeClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
