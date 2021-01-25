import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  //drop down value
  selectedValue: number;

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);

  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  //totalValue: Subject<number> = new BehaviorSubject<number>(0);
  cartItems: CartItem[] = [];
  constructor() {
    let data = JSON.parse(this.storage.getItem('cart'));
    if(data!=null){
      this.cartItems = data;

      this.computeCartTotals();
    }
   }

  storage: Storage = localStorage;


  addToCart(theCartItem: CartItem) {

    //Check to see the item is in the cart

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {

      //find the item in the cart based on item id
      existingCartItem = this.cartItems.find(tempCartItem =>tempCartItem.id === theCartItem.id);

      alreadyExistsInCart = (existingCartItem != undefined);

    }
    if (alreadyExistsInCart) {
      existingCartItem.selectedQuantity = this.selectedValue;
    }
    else {
      //theCartItem.selectedQuantity = this.selectedValue;

      this.cartItems.push(theCartItem);
    }

    //compute cart total price and total quantity
    this.computeCartTotals();
  }
  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for (let currentCartItem of this.cartItems) {
      // totalPriceValue += currentCartItem.quantity * currentCartItem.unitPrice;
      // totalQuantityValue += currentCartItem.quantity;
      totalPriceValue += currentCartItem.selectedQuantity * currentCartItem.unitPrice;
      totalQuantityValue++;
    }
    
    //publish the new values.all the subscribers will recieve the data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    //save the cart items in the web browser
    this.saveCartItems();
  }

  decrementQuantity(theCartItem: CartItem) {
    //theCartItem.quantity--;
    theCartItem.selectedQuantity--;

    if (theCartItem.selectedQuantity === 0){
      this.remove(theCartItem);
    }
    else{
      this.computeCartTotals();
    }
  }

  incrementQuantity(theCartItem: CartItem) {
    //theCartItem.quantity--;
    // theCartItem.selectedQuantity--;

    // if (theCartItem.quantity === 0 || theCartItem.selectedQuantity === 0) {
    //   this.remove(theCartItem);
    // }
    // else {
    //   this.computeCartTotals();
    // }
    if(theCartItem.selectedQuantity < theCartItem.quantity){
      theCartItem.selectedQuantity++;
      console.log(theCartItem.selectedQuantity);
    }
    this.computeCartTotals();
  }

  remove(theCartItem: CartItem) {
   
    //get index of item in the array
 
    const itemIndex = this.cartItems.findIndex(tempCartItem=>tempCartItem.id === theCartItem.id);

    //if found remove the item from the array

    if(itemIndex > -1){
      this.cartItems.splice(itemIndex,1);

      this.computeCartTotals();
    }
  }


  //saves the data to the local storage with key "cart"
   saveCartItems()
   {
     this.storage.setItem('cart',JSON.stringify(this.cartItems));
   }

}
