import { TestBed } from '@angular/core/testing';

import { Empservice } from './empservice';

describe('Empservice', () => {
  let service: Empservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Empservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
