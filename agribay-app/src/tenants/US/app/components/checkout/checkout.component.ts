import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private formBuilder: FormBuilder,
              private cartService: CartService) { }

  ngOnInit(): void {

    this.reviewCartDetails();

    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        email: new FormControl('', 
                                [Validators.required, 
                                 Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      deliveryAddress: this.formBuilder.group({
        name: new FormControl('', [Validators.required, Validators.minLength(2)]),
        address:new FormControl('', [Validators.required, Validators.minLength(10)]),
        city:new FormControl('', [Validators.required, Validators.minLength(3)]),
        state:new FormControl('', [Validators.required, Validators.minLength(3)]),
        pin:new FormControl('', [Validators.required, Validators.pattern('[0-9]{6}')]),
        phone:new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}')]),
      })
    });

  }
  reviewCartDetails() {
    // subscribe to cartService.totalQuantity
    this.cartService.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );
    // subscribe to cartService.totalPrice
    this.cartService.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );
  }


  get firstName() {
    return this.checkoutFormGroup.get('customer.firstName');
  }

  get lastName() {
    return this.checkoutFormGroup.get('customer.lastName');
  }

  get email() {
    return this.checkoutFormGroup.get('customer.email');
  }

  get name() {
    return this.checkoutFormGroup.get('deliveryAddress.name');
  }
  get address() {
    return this.checkoutFormGroup.get('deliveryAddress.address');
  }
  get city() {
    return this.checkoutFormGroup.get('deliveryAddress.city');
  }
  get state() {
    return this.checkoutFormGroup.get('deliveryAddress.state');
  }
  get pin() {
    return this.checkoutFormGroup.get('deliveryAddress.pin');
  }
  get phone() {
    return this.checkoutFormGroup.get('deliveryAddress.phone');
  }


  onSubmit() {
    console.log("Handling the submit form");

    if (this.checkoutFormGroup.invalid) {
      this.checkoutFormGroup.markAllAsTouched();
    }

    console.log(this.checkoutFormGroup.get('deliveryAddress').value);
  }

}
