import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditScategorieComponent } from './edit-scategorie.component';

describe('EditScategorieComponent', () => {
  let component: EditScategorieComponent;
  let fixture: ComponentFixture<EditScategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditScategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditScategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
