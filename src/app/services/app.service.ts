import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable()
export class AppService {

  private token:string;
  private user: User;


  constructor(public router: Router) { }

  getToken() {
    return localStorage.getItem("token");
  }
  getUser() {
    return this.user;
  }

  setUser(_user) {
    this.user = _user;
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem("token");
    this.router.navigate(['/sign-in']);
  }

  login(_token) {
    this.token = _token;
    localStorage.setItem("token", _token);
    this.router.navigate(['/panel']);
  }
}
