import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProductListingComponent } from './edit-product-listing.component';

describe('EditProductListingComponent', () => {
  let component: EditProductListingComponent;
  let fixture: ComponentFixture<EditProductListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProductListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProductListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
