import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateArticleWithBarcodeComponent } from './create-article-with-barcode.component';

describe('CreateArticleWithBarcodeComponent', () => {
  let component: CreateArticleWithBarcodeComponent;
  let fixture: ComponentFixture<CreateArticleWithBarcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateArticleWithBarcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateArticleWithBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
