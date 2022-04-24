import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginErr = false;

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this._auth.verifyLoggedIn()
    .subscribe(
      res => {
        if(res) {
          this.router.navigate(['/elective/cc/dashboard']);
        }
      },
      err => console.log(err)
    )
  }

  onClick(email: string, password: string) {
    this._auth.userLogin(email,password)
    .subscribe(
      res => {
        localStorage.setItem('token_cc', res);
        this.router.navigate(['/elective/cc/dashboard']);
      },
      err => {
        this.loginErr = true,
        console.log(err)
      }
    )
  }

}
