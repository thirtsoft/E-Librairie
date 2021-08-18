import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticleWithBarArcodeComponent } from './list-article-with-bar-arcode.component';

describe('ListArticleWithBarArcodeComponent', () => {
  let component: ListArticleWithBarArcodeComponent;
  let fixture: ComponentFixture<ListArticleWithBarArcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListArticleWithBarArcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArticleWithBarArcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
