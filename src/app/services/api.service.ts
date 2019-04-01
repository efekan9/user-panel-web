import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getProfile() {
    return this.http
      .get("http://localhost:3000/users/profile")
      .pipe(
        map(response => response["data"])
      );
  }

  saveUser(userData) {
    return this.http.post("http://localhost:3000/users", userData)
    .pipe(
      map(response => response["data"])
    )
  }
  updateUser(userData) {
    return this.http.put("http://localhost:3000/users", userData)
    .pipe(
      map(response => response["data"])
    )
  }
  getUsers() {
    return this.http
      .get("http://localhost:3000/users")
      .pipe(
        map(response => response["data"]),
        catchError(error => of([])));
  }

  signUp(user) {
    return this.http.post(
      "http://localhost:3000/users/register", user
    ).pipe(
      map(response => response["data"])
    )
  }

  signIn(loginData) {
    return this.http.post(
      "http://localhost:3000/users/auth", loginData
    ).pipe(
      map(response => response["data"])
    )
  }

}
