import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {
  userName: string = "";
  constructor(private loginSerivce: LoginService, private router: Router) { }

  ngOnInit() {
    if (this.loginSerivce.currentUserValue() === "" && this.loginSerivce.currentUserValue() === null) {
      this.router.navigate([""]);
    }
    else {
      var user = this.loginSerivce.currentUserValue();
      this.userName = user.username;
    }
  }

  logout() {
    this.loginSerivce.logout(this.loginSerivce.currentUserValue().key).subscribe(data => {
      this.router.navigate([""]);
    })
  }

}
