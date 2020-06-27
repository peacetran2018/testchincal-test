import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order/order.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: any[] = [];
  userName: string = "";
  constructor(private orderService: OrderService, private loginSerivce: LoginService, private router: Router) { }

  ngOnInit() {
    if (this.loginSerivce.currentUserValue() === "" && this.loginSerivce.currentUserValue() === null) {
      this.router.navigate([""]);
    }
    else {
      this.getOrder();
      var user = this.loginSerivce.currentUserValue();
      this.userName = user.username;
    }
  }

  getOrder() {
    this.orderService.getOrder().subscribe(data => {
      this.orders = data;
    })
  }
  logout() {
    this.loginSerivce.logout(this.loginSerivce.currentUserValue().key).subscribe(data => {
      this.router.navigate([""]);
    })
  }
}
