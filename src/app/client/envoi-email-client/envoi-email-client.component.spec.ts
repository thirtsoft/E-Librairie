import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoiEmailClientComponent } from './envoi-email-client.component';

describe('EnvoiEmailClientComponent', () => {
  let component: EnvoiEmailClientComponent;
  let fixture: ComponentFixture<EnvoiEmailClientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnvoiEmailClientComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvoiEmailClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
