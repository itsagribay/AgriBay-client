import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { SellerProductListingService } from 'src/app/services/seller-product-listing.service';

@Component({
  selector: 'app-edit-product-listing',
  templateUrl: './edit-product-listing.component.html',
  styleUrls: ['./edit-product-listing.component.css']
})
export class EditProductListingComponent implements OnInit {

  productId: string;

  productListingForm = this.formBuilder.group({
    itemName: [{value: "", disabled: true}, Validators.required],
    unitPrice: [1.0, Validators.required],
    totalQuantity: [1.0, Validators.required],
    description: [""],
  });

  totalPrice: number = 1.0;
  unitsForQuantity: string = 'kg';

  constructor(private route: ActivatedRoute,
              private sellerProductListingService: SellerProductListingService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.fetchProductData();
    });
    this.updateTotalPrice();
  }

  fetchProductData() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.productId = this.route.snapshot.paramMap.get('id');
      this.sellerProductListingService.getProductData(this.productId).subscribe(
        product => this.mapProductToFormValues(product)
        );
    }
  }

  mapProductToFormValues(product: Product) {
    this.productListingForm.setValue({
      itemName: product.item.name,
      unitPrice: product.unitPrice,
      totalQuantity: product.totalQuantity,
      description: product.description,
    });
    this.unitsForQuantity = product.item.unit;
    this.totalPrice = product.totalPrice
  }

  updateTotalPrice(): void {
    this.productListingForm.get('unitPrice').valueChanges.subscribe(val => {
      this.totalPrice = val * this.productListingForm.value.totalQuantity;
    });
    this.productListingForm.get('totalQuantity').valueChanges.subscribe(totalQuantity => {
      this.totalPrice = this.productListingForm.value.unitPrice * totalQuantity;
    });
  }

  updatedSellerProductListing() {
    const updates = {
      ...this.productListingForm.value,
      id: this.productId,
      totalPrice: this.totalPrice
    }
    this.sellerProductListingService.sendProductUpdates(updates);
  }

  onSubmit() {
    this.sellerProductListingService
    .updateProductListing(this.productId, this.productListingForm.value)
    .subscribe(() => this.updatedSellerProductListing());
    this.router.navigateByUrl('/product-listing');
  }

}
