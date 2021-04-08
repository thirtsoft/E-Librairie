import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadContratComponent } from './upload-contrat.component';

describe('UploadContratComponent', () => {
  let component: UploadContratComponent;
  let fixture: ComponentFixture<UploadContratComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadContratComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
