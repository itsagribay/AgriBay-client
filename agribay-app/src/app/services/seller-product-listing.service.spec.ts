import { TestBed } from '@angular/core/testing';

import { SellerProductListingService } from './seller-product-listing.service';

describe('SellerProductListingService', () => {
  let service: SellerProductListingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerProductListingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
