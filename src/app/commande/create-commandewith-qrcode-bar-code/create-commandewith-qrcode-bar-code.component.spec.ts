import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCommandewithQrcodeBarCodeComponent } from './create-commandewith-qrcode-bar-code.component';

describe('CreateCommandewithQrcodeBarCodeComponent', () => {
  let component: CreateCommandewithQrcodeBarCodeComponent;
  let fixture: ComponentFixture<CreateCommandewithQrcodeBarCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCommandewithQrcodeBarCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCommandewithQrcodeBarCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
