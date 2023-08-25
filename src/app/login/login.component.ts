import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  str:string='git';
  constructor(private authService: AuthService, private router: Router, private app:AppComponent) {}
  userInfo:{
    userName:string,
    isLoggedIn:boolean
  } ={
    userName:'',
    isLoggedIn:false
  };
  /*login(): void {
    this.authService.login().subscribe(() => {
      if (this.authService.isLoggedIn) {
        const redirectUrl = this.authService.redirectUrl ? this.authService.redirectUrl : '/job-card';
        this.router.navigate([redirectUrl]);
      }
    });
  }*/

  login(): void {
    this.authService.login(this.User.Username,this.User.Password).subscribe(() => {
      if (this.authService.isLoggedIn) {
        //this.app.isLogIn = this.authService.isLoggedIn;
        this.app.userInfo = this.authService.userInfo;
        const redirectUrl = this.authService.redirectUrl ? this.authService.redirectUrl : '/job-card';
        this.router.navigate([redirectUrl]);
      } else {
        //this.app.isLogIn = this.authService.isLoggedIn;
        this.app.userInfo = this.authService.userInfo;
        this.router.navigate(['/']);
      }
    });
  }

  User: {
    Username:string,
    Password:string
  } = {
    Username:'',
    Password:''
  };
  
}
