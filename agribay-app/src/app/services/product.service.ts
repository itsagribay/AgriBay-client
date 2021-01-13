import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/products';

  constructor(private httpClient: HttpClient) {}

  getProduct(productId: number): Observable<Product> {
    // need to build URL based on product id
    const productUrl = `${this.baseUrl}/${productId}`
    return this.httpClient.get<Product>(productUrl);
  }

  getProductsList(searchUrl: string): Observable<Product[]> {
    return this.httpClient
      .get<GetResponseProducts>(searchUrl)
      .pipe(map((response) => response.content));
  }

  getAllProducts(): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}?page=0&size=2`;
    return this.getProductsList(searchUrl);
  }

  getProductsByCategory(itemCategory: string): Observable<Product[]> {
    // build URL based on category
    const searchUrl = `${this.baseUrl}/search/findByCategory?category=${itemCategory}&page=0&size=2`;
    return this.getProductsList(searchUrl);
  }

  searchProducts(keyword: string): Observable<Product[]> {
    // build URL based on keyword
    const searchUrl = `${this.baseUrl}/search/findByItemNameContaining?name=${keyword}&page=0&size=2`;
    return this.getProductsList(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory> {
    const categoryUrl = `${this.baseUrl}/categories`;
    return this.httpClient.get<ProductCategory>(categoryUrl);
  }
}

interface GetResponseProducts {
  content: Product[];
}
