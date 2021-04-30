import { TestBed } from '@angular/core/testing';

import { SocketAPIService } from './socket-api.service';

describe('SocketAPIService', () => {
  let service: SocketAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SocketAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
