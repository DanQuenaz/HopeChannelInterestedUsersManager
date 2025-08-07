import { TestBed } from '@angular/core/testing';

import { WahaService } from './waha.service';

describe('WahaService', () => {
  let service: WahaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WahaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
