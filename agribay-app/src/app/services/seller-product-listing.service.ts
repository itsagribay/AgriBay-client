import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Item } from 'src/app/common/item';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class SellerProductListingService {
  
  private itemsUrl = 'http://localhost:8080/items';
  private productsUrl = 'http://localhost:8080/products';
  
  private _newProductSource = new Subject<Product>();
  newProduct$ = this._newProductSource.asObservable();
  
  private _productUpdatesSource = new Subject<any>();
  productUpdates$ = this._productUpdatesSource.asObservable();

  constructor(private httpClient: HttpClient) { }
  
  sendNewProduct(product: Product) {
    this._newProductSource.next(product);
  }

  sendProductUpdates(updates: any) {
    this._productUpdatesSource.next(updates);
  }

  getProductsBySeller(): Observable<Product[]> {
    const searchUrl = `${this.productsUrl}/findBySeller`;
    return this.httpClient.get<Product[]>(searchUrl);
  }
  
  getAllItems(): Observable<Item[]> {
    return this.httpClient.get<Item[]>(this.itemsUrl);
  }

  getProductData(id: string): Observable<Product> {
    const productUrl = `${this.productsUrl}/${id}`;
    return this.httpClient.get<Product>(productUrl);
  }
  
  updateProductListing(id: string, value: any): Observable<void> {
    const patchUrl = `${this.productsUrl}/${id}`;
    return this.httpClient.patch<void>(patchUrl, value);
  }
  
  deleteProductListing(id: number): Observable<void> {
    const deleteUrl = `${this.productsUrl}/${id}`;
    return this.httpClient.delete<void>(deleteUrl);
  }
  
  createProductListing(productCreateRequest: string, imageFile1: File, imageFile2: File): Observable<HttpEvent<Product>> {
    let formData: FormData = new FormData();

    formData.append('productCreateRequest', productCreateRequest);
    formData.append('imageFiles', imageFile1);
    formData.append('imageFiles', imageFile2);

    const req = new HttpRequest('POST', this.productsUrl, formData, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.httpClient.request(req);
  }
}
