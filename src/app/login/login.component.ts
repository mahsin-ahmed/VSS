import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { AppComponent } from '../app.component';
import { CommonService, toastPayload } from '../services/common.service';
import { IndividualConfig } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService, 
  private router: Router, 
  private cs:CommonService,
  private httpClient: HttpClient,
  private app:AppComponent) {}
  User:{UserName:string,UserPass:string}={UserName:'',UserPass:''};
  login(): void {
    this.showMessage('info', 'Your are logging, please wait....');
    this.httpClient.post(this.authService.baseURL + '/api/Login', this.User).subscribe((res) => {
      var isLogIn:boolean = false;
      if(res != null){
        isLogIn = true;
      }
      this.authService.login(res, isLogIn).subscribe(() => {
        if (this.authService.UserInfo.IsLogIn) {
          this.router.navigate([this.authService.UserInfo.RedirectURL]);
        } else {
          this.router.navigate([this.authService.UserInfo.RedirectURL]);
        }
      });
    });
  }

  toast!: toastPayload;
  showMessage(type: string, message: string) {
    this.toast = {
      message: message,
      title: type.toUpperCase(),
      type: type,
      ic: {
        timeOut: 2500,
        closeButton: true,
      } as IndividualConfig,
    };
    this.cs.showToast(this.toast);
  }

}
