import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { SellerProductListingService } from 'src/app/services/seller-product-listing.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-seller-product-listing',
  templateUrl: './seller-product-listing.component.html',
  styleUrls: ['./seller-product-listing.component.css']
})
export class SellerProductListingComponent implements OnInit {

  products: Product[] = [];
  productToDelete: Product;

  constructor(private sellerProductListingService: SellerProductListingService,
    config: NgbModalConfig, 
    private modalService: NgbModal) { 
      config.backdrop = 'static';
      config.keyboard = false;
  }

  ngOnInit(): void {
    this.sellerProductListingService.newProduct$.subscribe(
      product => this.products.push(product)
    );
    this.sellerProductListingService.productUpdates$.subscribe(
      updates => this.updateProduct(updates)
    );
    this.fetchProductListings();
  }

  updateProduct(updates: any) {
    this.products.forEach(product => {
      if (product.id == updates.id) {
        product.unitPrice = updates.unitPrice;
        product.totalQuantity = updates.totalQuantity;
        product.totalPrice = updates.totalPrice;
        product.description = updates.description;
        return product;
      }
    });
  }

  fetchProductListings() {
    this.sellerProductListingService.getProductsBySeller()
    .subscribe(
      data => {
        this.products = data;
      }
    );
  }

  openDeleteDialogModal(content, product: Product) {
    this.productToDelete = product;
    this.modalService.open(content).result
    .then((result) => {
      if (result === 'Ok click') {
        this.deleteProductListing(product.id);
      }
    }, 
    (reason) => {
      // dismissed do nothing just close
    });
  }

  removeByAttr = function(arr, attr, value){
    var i = arr.length;
    while(i--){
       if( arr[i] 
           && arr[i].hasOwnProperty(attr) 
           && (arguments.length > 2 && arr[i][attr] === value ) ){ 

           arr.splice(i,1);

       }
    }
    return arr;
}


  deleteProductListing(id: number) {
    this.sellerProductListingService.deleteProductListing(id).subscribe(
      () => {
        this.removeByAttr(this.products, 'id', id);
      }
    )
  }
}
