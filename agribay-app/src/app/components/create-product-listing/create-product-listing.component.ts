import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { Validators } from "@angular/forms";
import { FormArray } from "@angular/forms";
import { Router } from '@angular/router';
import { Item } from 'src/app/common/item';
import { Product } from 'src/app/common/product';
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
    totalQuantity: [1, Validators.required],
    description: [""],
  });

  items: Array<Item> = [];
  totalPrice: number = 1;
  unitsForQuantity: string = 'kg';

  
  selectedImageFile1: File = null;
  imageFile1Upload: File = null;
  
  selectedImageFile2: File = null;
  imageFile2Upload: File = null;
  
  progress: { percentage: number } = { percentage: 0 }
  isSelectedImageFilesValid: boolean = true;

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

  addToSellerProductListing(product: Product) {
    this.sellerProductListingService.sendNewProduct(product);
  }

  toFormData<T>( formValue: T ) {
    const formData = new FormData();
    formData.append('productCreateRequest', JSON.stringify(this.productListingForm.value));
    formData.append('image', 'something appropriate here');
    return formData;
  }

  selectFile(id: any, file: any) {
    console.log(id + " " + file);
    if (id === 'image1') {
      this.selectedImageFile1 = file;
    } else if (id === 'image2') {
      this.selectedImageFile2 = file;
    }
  }

  handleSelectFileChange(event) {
    const id = event.target.id;
    const file = event.target.files.item(0)

    if (file.type.match('image.*')) {
      this.isSelectedImageFilesValid = true;
      this.selectFile(id, file);
    } else {
      this.isSelectedImageFilesValid = false;
      alert('invalid format!');
    }
  }
  
  onSubmit() {
    this.progress.percentage = 0;
    const productCreateRequest = JSON.stringify(this.productListingForm.value);
    
    this.imageFile1Upload = this.selectedImageFile1;
    this.imageFile2Upload = this.selectedImageFile2;

    this.sellerProductListingService.createProductListing(
      productCreateRequest, 
      this.imageFile1Upload,
      this.imageFile2Upload).subscribe(event => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress.percentage = Math.round(100 * event.loaded / event.total);
        console.log("progress percent " + this.progress.percentage);
      } else if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
        const product = event.body;
        console.log(product);
        this.addToSellerProductListing(product);
        // setTimeout(() => {
          this.router.navigateByUrl('/product-listing')
        // }, 1000);
      }
    })
  
    this.selectedImageFile1 = undefined;
    this.selectedImageFile2 = undefined;
  }
}
