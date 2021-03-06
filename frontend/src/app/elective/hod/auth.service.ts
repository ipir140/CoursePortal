import { Router } from '@angular/router';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';


import jwt_decode, { JwtPayload } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // profile details
  public id!: string;
  public name!: string;
  public email!: string;
  public stream!: string; //IT or ECE

  private login_url = 'http://localhost:3001/elective/hod/login';
  private fetch_profile_url = 'http://localhost:3001/elective/hod/profile';
  private token_verify_url = 'http://localhost:3001/jwt/verify_token';


  constructor(private http: HttpClient, private router: Router) { }

  decodeJWT() {
    let token = localStorage.getItem('token_hod') as string;
    let decoded_token = jwt_decode<any>(token);

    this.id = decoded_token.id;
    this.name = decoded_token.name;
    this.email = decoded_token.email;
  }

  userLogin(email: string, password: string) {
    return this.http.post<any>(this.login_url, {email: email, password: password});
  }

  verifyLoggedIn():Observable<boolean>{
    let token = localStorage.getItem('token_hod');
    if(!token) return observableOf(false);
    return this.http.post<any>(this.token_verify_url, {token: token});
  }

  fetchProfile() {
    this.decodeJWT();

    this.fetch_profile()
    .subscribe(
      res => {
        this.stream = res.stream,
        console.log(res)
      },
      err => console.log(err)
    )
  }

  fetch_profile() {
    let params = new HttpParams()
                  .set('id', this.id);

    return this.http.get<any>(this.fetch_profile_url, {params})
  }

  userLogout() {
    localStorage.removeItem('token_hod');
    this.router.navigate(['/elective/hod/login']);
  }
}
