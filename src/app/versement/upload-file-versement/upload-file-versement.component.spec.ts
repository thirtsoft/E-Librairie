import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadFileVersementComponent } from './upload-file-versement.component';

describe('UploadFileVersementComponent', () => {
  let component: UploadFileVersementComponent;
  let fixture: ComponentFixture<UploadFileVersementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadFileVersementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadFileVersementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
