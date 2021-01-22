import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  name: string;


  constructor(private activatedRoute: ActivatedRoute,private cartservice : CartService) {
    this.name = this.activatedRoute.snapshot.params.name;

    // get products here

  }

  ngOnInit(): void {
    this.getCartDetails();
  }
  getCartDetails(){
    this.cartItems = this.cartservice.cartItems;

  }
  cartItems: CartItem[] = [];

}
