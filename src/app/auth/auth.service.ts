import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //isLogIn:boolean = false;
  UserInfo:{
    UserName:string,
    IsLogIn:boolean
    UserID:number,
    Token:string,
    Permissions:any,
    RedirectURL:string
  } = {
    UserName:'',
    IsLogIn:false,
    UserID:0,
    Token:'',
    Permissions:[],
    RedirectURL:''
  };

  constructor() { 
    const strUserInfo = localStorage.getItem("UserInfo");
    if (typeof strUserInfo === 'string') {
        this.UserInfo = JSON.parse(strUserInfo);
    }
  }

  // store the URL so we can redirect after logging in
  baseURL:string='http://localhost:56297';
  //redirectUrl: string | null = null;
  login(userInfo:any, isLogIn:boolean):Observable<boolean> {
    this.reset();
    if(isLogIn){
      this.UserInfo.IsLogIn = isLogIn;
      this.UserInfo.UserName = userInfo.UserName;
      this.UserInfo.Token = userInfo.Token;
      this.UserInfo.UserID = userInfo.UserID;
      this.UserInfo.Permissions = userInfo.Permissions;
      this.UserInfo.RedirectURL = '/dashboard';
      localStorage.setItem('UserInfo',JSON.stringify(this.UserInfo));
    } else {
      this.logout();
    }
    return of(true).pipe(delay(1000),tap(() => (this.UserInfo.IsLogIn)));
  }

  logout(): void {
    this.reset();
    localStorage.removeItem('UserInfo');
    //location.reload();
  }

  reset() {
    this.UserInfo.IsLogIn = false;
    this.UserInfo.UserName = '';
    this.UserInfo.Token = '';
    this.UserInfo.UserID = 0;
    this.UserInfo.RedirectURL = '/login';
  }

}
