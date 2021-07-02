import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateVentewithQrcodeBarCodeComponent } from './create-ventewith-qrcode-bar-code.component';

describe('CreateVentewithQrcodeBarCodeComponent', () => {
  let component: CreateVentewithQrcodeBarCodeComponent;
  let fixture: ComponentFixture<CreateVentewithQrcodeBarCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateVentewithQrcodeBarCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateVentewithQrcodeBarCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
