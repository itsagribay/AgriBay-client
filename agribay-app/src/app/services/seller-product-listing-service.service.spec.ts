import { TestBed } from '@angular/core/testing';

import { SellerProductListingServiceService } from './seller-product-listing-service.service';

describe('SellerProductListingServiceService', () => {
  let service: SellerProductListingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SellerProductListingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
