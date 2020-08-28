import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateScategorieComponent } from './create-scategorie.component';

describe('CreateScategorieComponent', () => {
  let component: CreateScategorieComponent;
  let fixture: ComponentFixture<CreateScategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateScategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateScategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
