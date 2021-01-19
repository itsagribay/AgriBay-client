import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/common/item';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class SellerProductListingService {
  
  private itemsUrl = 'http://localhost:8080/items';
  private productsUrl = 'http://localhost:8080/products';
  
  constructor(private httpClient: HttpClient) { }
  
  getProductsBySeller(): Observable<Product[]> {
    const searchUrl = `${this.productsUrl}/findBySeller`;
    return this.httpClient.get<Product[]>(searchUrl);
  }

  getAllItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.itemsUrl);
  }
  
  createProductListing(value: any): Observable<Product> {
    return this.httpClient.post<Product>(this.productsUrl, value);
  }
  
  deleteProductListing(id: number): Observable<void> {
    const deleteUrl = `${this.productsUrl}/${id}`;
    return this.httpClient.delete<void>(deleteUrl);
  }
}
