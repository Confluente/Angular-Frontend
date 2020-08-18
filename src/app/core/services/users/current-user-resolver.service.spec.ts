import { TestBed } from '@angular/core/testing';

import { CurrentUserResolverService } from './current-user-resolver.service';

describe('CurrentUserResolverService', () => {
  let service: CurrentUserResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentUserResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
