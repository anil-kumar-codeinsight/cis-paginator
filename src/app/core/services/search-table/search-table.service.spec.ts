import { TestBed } from '@angular/core/testing';

import { SearchTableService } from './search-table.service';

describe('SearchTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchTableService = TestBed.get(SearchTableService);
    expect(service).toBeTruthy();
  });
});
