import { TestBed } from '@angular/core/testing';

import { CreanceService } from './creance.service';

describe('CreanceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreanceService = TestBed.get(CreanceService);
    expect(service).toBeTruthy();
  });
});
