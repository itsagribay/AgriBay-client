import { TestBed } from '@angular/core/testing';

import { AgribayFormService } from './agribay-form.service';

describe('AgribayFormService', () => {
  let service: AgribayFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgribayFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
