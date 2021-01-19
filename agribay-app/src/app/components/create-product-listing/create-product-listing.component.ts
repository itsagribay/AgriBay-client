import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormArray } from "@angular/forms";
import { Router } from '@angular/router';
import { Item } from 'src/app/common/item';
import { SellerProductListingService } from 'src/app/services/seller-product-listing.service';

@Component({
  selector: 'app-create-product-listing',
  templateUrl: './create-product-listing.component.html',
  styleUrls: ['./create-product-listing.component.css']
})
export class CreateProductListingComponent implements OnInit {

  productListingForm = this.fb.group({
    itemId: ["", Validators.required],
    unitPrice: [1, Validators.required],
    totalQuantity: [0, Validators.required],
    imageUrl1: [""],
    imageUrl2: [""],
    description: [""],
    sellerAddress: [""]   // just here with default value if address is required in future.
  });

  items: Array<Item>;
  totalPrice: number = 0;
  unitsForQuantity: string = 'kg';

  constructor(private fb: FormBuilder, 
    private sellerProductListingService: SellerProductListingService,
    private router: Router) {}

  ngOnInit(): void {
    this.updateTotalPrice();    // call this to set up listeners
                                // (on unitPrice & totalQuantity) for updating total price.
    this.handleItemIdChange();
    this.fetchAllItems();
  }

  fetchAllItems(): void {
    this.sellerProductListingService.getAllItems().subscribe(
      data => {
        this.items = data;
      }
    );
  }
  
  updateTotalPrice(): void {
    this.productListingForm.get('unitPrice').valueChanges.subscribe(val => {
      this.totalPrice = val * this.productListingForm.value.totalQuantity;
    });
    this.productListingForm.get('totalQuantity').valueChanges.subscribe(totalQuantity => {
      this.totalPrice = this.productListingForm.value.unitPrice * totalQuantity;
    });
  }

  handleItemIdChange(): void {
    this.productListingForm.get('itemId').valueChanges.subscribe(itemId => {
      this.items.forEach(element => {
        if (element.id == itemId) {
          this.unitsForQuantity = element.unit;
        }
      });
    });
  }
  
  onSubmit() {
    this.sellerProductListingService
    .createProductListing(this.productListingForm.value)
    .subscribe(data => console.log(data));
    this.router.navigateByUrl('/product-listing');    
  }
}
