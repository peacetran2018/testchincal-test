import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer/customer.service';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customer: any;
  userName: string = "";
  constructor(private customerService: CustomerService, private loginSerivce: LoginService, private router: Router) { }

  ngOnInit() {
    if (this.loginSerivce.currentUserValue() === "" || this.loginSerivce.currentUserValue() === null) {
      this.router.navigate([""]);
    }
    else {
      this.customer = {
        "customerName": "",
        "customerAge": 0,
        "customerAddress": "",
      }

      var user = this.loginSerivce.currentUserValue();
      this.userName = user.username;
    }
  }
  saveCustomer(model: any) {
    this.customerService.addCustomer(model).subscribe(data => {
      console.log(data);
    })
  }

  logout() {
    this.loginSerivce.logout(this.loginSerivce.currentUserValue().key).subscribe(data => {
      this.router.navigate([""]);
    })
  }
}
