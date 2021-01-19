import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerProductListingComponent } from './seller-product-listing.component';

describe('SellerProductListingComponent', () => {
  let component: SellerProductListingComponent;
  let fixture: ComponentFixture<SellerProductListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SellerProductListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerProductListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
