import { TestBed } from '@angular/core/testing';

import { FireViajesServiceService } from './fire-viajes-service.service';

describe('FireViajesServiceService', () => {
  let service: FireViajesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FireViajesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
