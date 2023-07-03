import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './homePage/header/header.component';
import { FooterComponent } from './homePage/footer/footer.component';
import { CreateItemComponent } from './item/create-item/create-item.component';
import { SeeItemComponent } from './item/see-item/see-item.component';
import { HomeComponent } from './homePage/home/home.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AuthInterceptor } from './services/auth-interceptor';
import { ItemDetailComponent } from './item/item-detail/item-detail.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { OrdersComponent } from './user/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CreateItemComponent,
    SeeItemComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ItemDetailComponent,
    UserDetailComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
