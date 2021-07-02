import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewArticleWithQrcodeBarcodeComponent } from './view-article-with-qrcode-barcode.component';

describe('ViewArticleWithQrcodeBarcodeComponent', () => {
  let component: ViewArticleWithQrcodeBarcodeComponent;
  let fixture: ComponentFixture<ViewArticleWithQrcodeBarcodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewArticleWithQrcodeBarcodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewArticleWithQrcodeBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
