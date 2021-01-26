import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems:CartItem[] = [];
  totalPrice:number = 0;
  totalQuantity:number = 0;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  //selectedValue:number = this.cartService.selectedValue;

  listCartDetails() {
    //copying the items from the service
    this.cartItems = this.cartService.cartItems;

    //subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(data=>this.totalPrice=data);

    //subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(data => this.totalQuantity = data);

    //calculate cart total price and quantity
    this.cartService.computeCartTotals();
  }

  
  // incrementQuantity(theCartItem:CartItem){
  //   //this.cartService.addToCart(theCartItem);
  //   this.cartService.incrementQuantity(theCartItem);
  //   alert(theCartItem.selectedQuantity);
  // }


  //increment quantity
  incrementQuantity(tempCartItem) {
    //this.cartService.addToCart(theCartItem);
    this.cartService.incrementQuantity(tempCartItem);
  }


  //decrement quantity
  decrementQuantity(tempCartItem){
    this.cartService.decrementQuantity(tempCartItem);
  }

  //remove cart item
  remove(theCartItem:CartItem)
  {
    this.cartService.remove(theCartItem);
  }

}
