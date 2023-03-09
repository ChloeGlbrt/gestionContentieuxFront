import { TestBed } from '@angular/core/testing';

import { AffaireService } from './affaire.service';

describe('AffaireService', () => {
  let service: AffaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AffaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
