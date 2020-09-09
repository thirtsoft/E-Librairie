import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCommandeClientComponent } from './edit-commande-client.component';

describe('EditCommandeClientComponent', () => {
  let component: EditCommandeClientComponent;
  let fixture: ComponentFixture<EditCommandeClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCommandeClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCommandeClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
