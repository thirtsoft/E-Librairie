import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticleWithBarrcodeComponent } from './list-article-with-barrcode.component';

describe('ListArticleWithBarrcodeComponent', () => {
  let component: ListArticleWithBarrcodeComponent;
  let fixture: ComponentFixture<ListArticleWithBarrcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListArticleWithBarrcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArticleWithBarrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
