import { TestBed } from '@angular/core/testing';

import { LocaionService } from './locaion.service';

describe('LocaionService', () => {
  let service: LocaionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocaionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
