import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './homePage/home/home.component';
import { CreateItemComponent } from './item/create-item/create-item.component';
import { ItemDetailComponent } from './item/item-detail/item-detail.component';
import { SeeItemComponent } from './item/see-item/see-item.component';
import { LoginComponent } from './user/login/login.component';
import { OrdersComponent } from './user/orders/orders.component';
import { RegisterComponent } from './user/register/register.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'items', component: SeeItemComponent},
  {path: 'item/:itemId', component: ItemDetailComponent},
  {path: 'edit/:itemId', component: CreateItemComponent, canActivate: [AuthGuard]},
  {path: 'add-items', component: CreateItemComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'user', component: UserDetailComponent, canActivate: [AuthGuard]},
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
