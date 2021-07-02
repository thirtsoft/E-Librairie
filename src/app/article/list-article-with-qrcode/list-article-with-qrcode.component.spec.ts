import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListArticleWithQrcodeComponent } from './list-article-with-qrcode.component';

describe('ListArticleWithQrcodeComponent', () => {
  let component: ListArticleWithQrcodeComponent;
  let fixture: ComponentFixture<ListArticleWithQrcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListArticleWithQrcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListArticleWithQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
