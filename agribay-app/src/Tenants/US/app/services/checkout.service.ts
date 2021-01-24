import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Purchase } from '../class/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  reset() {
    // to do - reset cart
  }


  private purchaseApi = 'http://localhost:8080/api/checkout/purchase';


  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any> {
    return this.httpClient.post<Purchase>(this.purchaseApi, purchase);
  }
}
