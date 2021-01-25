import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();

  constructor(private productService: ProductService,private cartService:CartService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(() => {
      this.handleProductDetails();
    })
  }

  handleProductDetails() {
    // get the "id" param string. convert string to a number using the '+' symbol
    const productId: number = +this.activatedRoute.snapshot.paramMap.get('id');

    this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data;
      }
    )
  }

  getFullPathOfImage(product: Product) {
    return null;
    // const sellerName = product.seller.username;
    // const sellerId = product.seller.id;
    // return `http://localhost:8080/products/image/download/${sellerName}${sellerId}/${product.imageUrl1}`;
  }

  addToCart(){
    const theCartItem = new CartItem(this.product);
    this.cartService.selectedValue = theCartItem.selectedQuantity = this.selectedValue.get(this.product.id);
    if (theCartItem.selectedQuantity == undefined) {
      theCartItem.selectedQuantity = 1;
      this.cartService.selectedValue = 1;
    }
    this.cartService.addToCart(theCartItem);
  }

  counter(i: number) {
    return new Array(i);
  }

  selectedValue: Map<number, number> = new Map();
  selectChangeHandler(event: any, product: Product) {
    this.selectedValue.set(product.id, event.target.value);
    console.log(product);
  }

}
