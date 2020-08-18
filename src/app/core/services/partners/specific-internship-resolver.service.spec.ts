import { TestBed } from '@angular/core/testing';

import { SpecificInternshipResolverService } from './specific-internship-resolver.service';

describe('SpecificInternshipResolverService', () => {
  let service: SpecificInternshipResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecificInternshipResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
