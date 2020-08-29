import { TestBed } from '@angular/core/testing';

import { AvoirService } from './avoir.service';

describe('AvoirService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvoirService = TestBed.get(AvoirService);
    expect(service).toBeTruthy();
  });
});
