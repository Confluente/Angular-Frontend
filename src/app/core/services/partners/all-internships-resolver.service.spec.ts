import { TestBed } from '@angular/core/testing';

import { AllInternshipsResolverService } from './all-internships-resolver.service';

describe('AllInternshipsResolverService', () => {
  let service: AllInternshipsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllInternshipsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
