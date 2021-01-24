import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  // templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  searchMode: boolean = false;
  categoryMode: boolean = false;
  currentItemCategory: string = null;
  previousItemCategory: string = null;

  // new properties for pagination
  pageNumber: number = 1;
  pageSize: number = 2; // change to 10 later
  totalElements: number = 0;

  previousKeyword: string = null;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,private cartService:CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    // check if "keyword" parameter is available
    this.searchMode = this.route.snapshot.paramMap.has('keyword');
    // check if "itemCategory" parameter is available
    this.categoryMode = this.route.snapshot.paramMap.has('itemCategory');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else if (this.categoryMode) {
      this.handleListProductsByCategory();
    } else {
      this.handleListAllProducts();
    }
  }
  
  processResult() {
    return data => {
      this.products = data.content;
      this.pageNumber = data.number + 1;
      this.pageSize = data.size;
      this.totalElements = data.totalElements;
    }
  }

  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword');

    // if we have a different keyword than previous
    // then set pageNumber to 1
    if (this.previousKeyword !== keyword) {
      this.pageNumber = 1;
    }

    this.previousKeyword = keyword;

    // now search for the products using keyword
    this.productService.searchProductsPaginate(
      this.pageNumber - 1,
      this.pageSize,
      keyword
    ).subscribe(this.processResult());
  }

  handleListProductsByCategory() {
    this.currentItemCategory = this.route.snapshot.paramMap.get('itemCategory');

    if (this.previousItemCategory !== this.currentItemCategory) {
      this.pageNumber = 1;
    }

    this.previousItemCategory = this.currentItemCategory;

    this.productService
      .getProductsByCategoryPaginate(
        this.pageNumber - 1,
        this.pageSize,
        this.currentItemCategory
      )
      .subscribe(this.processResult());
  }


  handleListAllProducts() {
    this.productService.getAllProductsPaginate(
      this.pageNumber - 1,
      this.pageSize,
    ).subscribe(this.processResult());
  }

  updatePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listProducts();
  }

   addToCart(theProduct:Product)
   {
     const theCartItem = new CartItem(theProduct);
     this.cartService.addToCart(theCartItem);
   }

}
