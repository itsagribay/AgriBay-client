import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductListingComponent } from './create-product-listing.component';

describe('CreateProductListingComponent', () => {
  let component: CreateProductListingComponent;
  let fixture: ComponentFixture<CreateProductListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProductListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProductListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
