import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';

import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { SellerProductListingComponent } from './components/seller-product-listing/seller-product-listing.component';
import { CreateProductListingComponent } from './components/create-product-listing/create-product-listing.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Routes, RouterModule } from "@angular/router";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductService } from "./services/product.service";
import { SellerProductListingService } from "./services/seller-product-listing.service";

import { CheckoutComponent } from './components/checkout/checkout.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AppRoutingModule } from './app-routing.module';

import { NgxWebstorageModule } from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptor } from './auth/token-interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserProfileComponent } from './auth/user-profile/user-profile.component';
//import { EditorModule } from '@tinymce/tinymce-angular';


const routes: Routes = [
  //{path: 'product-listing/edit/:id', component: EditProductListing}
  {path: 'product-listing/create', component: CreateProductListingComponent},
  {path: 'product-listing', component: SellerProductListingComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent },
  {path: 'products/:id', component: ProductDetailsComponent},
  {path: 'search/:keyword', component: ProductListComponent},
  {path: 'category/:itemCategory', component: ProductListComponent},
  {path: 'category', component: ProductListComponent},
  {path: 'products', component: ProductListComponent},
  {path: 'signup', component: SignupComponent},
  {path: 'login', component: LoginComponent},
   {path: '', redirectTo: '/products', pathMatch: 'full'},
  {path: '**', redirectTo: '/products', pathMatch: 'full'},
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    ProductSearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    SellerProductListingComponent,
    CreateProductListingComponent,
    CheckoutComponent,
    SignupComponent,
    LoginComponent,
    UserProfileComponent
    
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgxWebstorageModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    ProductService,
    SellerProductListingService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
