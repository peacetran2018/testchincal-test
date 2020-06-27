import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { CustomerComponent } from './customer/customer.component';
import { OrdersComponent } from "./orders/orders.component";
import { HierarchyComponent } from './hierarchy/hierarchy.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: "main",
    component: MainpageComponent,
  },
  {
    path:"customer",
    component: CustomerComponent
  },
  {
    path:"order",
    component: OrdersComponent
  },
  {
    path: "hierarchy",
    component: HierarchyComponent
  },
  {
    path: "", redirectTo: "", pathMatch: "full"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
