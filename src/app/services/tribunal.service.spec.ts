import { TestBed } from '@angular/core/testing';

import { TribunalService } from './tribunal.service';

describe('TribunalService', () => {
  let service: TribunalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TribunalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
