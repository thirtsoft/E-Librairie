import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArticleWithQrcodeComponent } from './create-article-with-qrcode.component';

describe('CreateArticleWithQrcodeComponent', () => {
  let component: CreateArticleWithQrcodeComponent;
  let fixture: ComponentFixture<CreateArticleWithQrcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateArticleWithQrcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateArticleWithQrcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
