import { TestBed } from '@angular/core/testing';

import { CmdClientService } from './cmd-client.service';

describe('CmdClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CmdClientService = TestBed.get(CmdClientService);
    expect(service).toBeTruthy();
  });
});
