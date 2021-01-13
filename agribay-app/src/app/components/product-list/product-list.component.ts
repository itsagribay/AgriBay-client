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
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  searchMode: boolean
  categoryMode: boolean
  currentItemCategory: string;

  constructor(private productService: ProductService,
              private route: ActivatedRoute,private cartService:CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    })
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

  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword');

    // now search for the products using keyword
    this.productService.searchProducts(keyword).subscribe(
      data => {
        this.products = data;
      }
    );
  }

  handleListProductsByCategory() {
    this.currentItemCategory = this.route.snapshot.paramMap.get('itemCategory');

    this.productService.getProductsByCategory(this.currentItemCategory).subscribe(
      data => {
        this.products = data;
      }
    );
  }

  handleListAllProducts() {
    this.productService.getAllProducts().subscribe(
      data => {
        this.products = data;
      }
    );
  }

   addToCart(theProduct:Product)
   {
     const theCartItem = new CartItem(theProduct);
     this.cartService.addToCart(theCartItem);
   }

}
