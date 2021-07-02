import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticleWithBarCodeComponent } from './list-article-with-bar-code.component';

describe('ListArticleWithBarCodeComponent', () => {
  let component: ListArticleWithBarCodeComponent;
  let fixture: ComponentFixture<ListArticleWithBarCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListArticleWithBarCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArticleWithBarCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
