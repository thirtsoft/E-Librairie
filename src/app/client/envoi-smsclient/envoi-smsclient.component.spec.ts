import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoiSMSClientComponent } from './envoi-smsclient.component';

describe('EnvoiSMSClientComponent', () => {
  let component: EnvoiSMSClientComponent;
  let fixture: ComponentFixture<EnvoiSMSClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvoiSMSClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvoiSMSClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
