import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    return this.http.get<any>(`https://kem.greenkoncepts.com/ems/services/ResourceService/login?username=${username}&credential=${password}`,
      {})
      .pipe(map(user => {

        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
      }));
  }

  logout(sessionKey) {
    return this.http.get<any>(`https://kem.greenkoncepts.com/ems/services/ResourceService/logout?key=${sessionKey}`,
      {})
      .pipe(map(user => {

        localStorage.removeItem('currentUser');
        return user;
      }));
  }

  currentUserValue(): any {
    if (localStorage.getItem("currentUser") !== "" || localStorage.getItem("currentUser") !== null) {
      return JSON.parse(localStorage.getItem('currentUser'));
    }
  }
}
