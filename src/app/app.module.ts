import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppComponent} from './app.component';
import {EcommerceComponent} from './ecommerce/ecommerce.component';
import {ProductsComponent} from './ecommerce/products/products.component';
import {ShoppingCartComponent} from './ecommerce/shopping-cart/shopping-cart.component';
import {OrdersComponent} from './ecommerce/orders/orders.component';
import {EcommerceService} from './ecommerce/services/EcommerceService';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { Interceptor } from './shared/app.interceptor';
import { TokenStorage } from './shared/token.storage';
import { AuthGuardService } from './shared/auth-guard-service';


@NgModule({
    declarations: [
        AppComponent,
        EcommerceComponent,
        ProductsComponent,
        ShoppingCartComponent,
        OrdersComponent,
        HomeComponent,
        LoginComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule
    ],
    providers: [
      EcommerceService,
      TokenStorage,
      AuthGuardService,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: Interceptor,
        multi: true
      }

    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
