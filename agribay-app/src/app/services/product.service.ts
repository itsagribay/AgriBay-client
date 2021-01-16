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

  getProductsListPaginate(searchUrl: string): Observable<GetResponseProducts> {
    return this.httpClient
      .get<GetResponseProducts>(searchUrl);
  }

  getAllProductsPaginate(page: number, pageSize: number): Observable<GetResponseProducts> {
    const searchUrl = `${this.baseUrl}?page=${page}&size=${pageSize}`;
    return this.getProductsListPaginate(searchUrl);
  }

  getProductsByCategoryPaginate(page: number,
                                pageSize: number,
                                itemCategory: string): Observable<GetResponseProducts> {
    // build URL based on category, page and size
    const searchUrl = `${this.baseUrl}/search/findByCategory?category=${itemCategory}`
                      + `&page=${page}&size=${pageSize}`;
    return this.getProductsListPaginate(searchUrl);
  }

  searchProductsPaginate(page: number,
                          pageSize: number,
                          keyword: string): Observable<GetResponseProducts> {
    // build URL based on keyword
    const searchUrl = `${this.baseUrl}/search/findByItemNameContaining?name=${keyword}&page=${page}&size=${pageSize}`;
    return this.getProductsListPaginate(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory> {
    const categoryUrl = `${this.baseUrl}/categories`;
    return this.httpClient.get<ProductCategory>(categoryUrl);
  }
}

interface GetResponseProducts {
  content: Product[];
  size: number,
  totalElements: number,
  totalPages: number,
  number: number,
}
