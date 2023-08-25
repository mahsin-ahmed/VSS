import { Injectable } from '@angular/core';
import { Observable, delay, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn:boolean = false;
  userInfo:{
    userName:string,
    isLoggedIn:boolean
  } = {
    userName:'',
    isLoggedIn:false
  };
  constructor() { 
    const strUserInfo = localStorage.getItem("userInfo");
    if (typeof strUserInfo === 'string') {
        this.userInfo = JSON.parse(strUserInfo); // ok
        this.isLoggedIn = this.userInfo.isLoggedIn;
    }else{
      this.isLoggedIn = false;
    }
  }
  // store the URL so we can redirect after logging in
  redirectUrl: string | null = null;
  login(username:string, password:string): Observable<boolean> {
    if (username == 'vss' && password == 'vss@23') {
      this.redirectUrl = '/job-card';
      this.isLoggedIn = true;
      this.userInfo.userName = username;
      this.userInfo.isLoggedIn = this.isLoggedIn;
      localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
      return of(true).pipe(delay(1000),tap(() => (this.isLoggedIn = true)));
    } else {
      return of(true).pipe(delay(1000),tap(() => (this.isLoggedIn = false)));
    }
  }

  logout(): void {
    this.isLoggedIn = false;
    this.userInfo.isLoggedIn = this.isLoggedIn;
    this.userInfo.userName = '';
    localStorage.removeItem('userInfo');
    //location.reload();
  }
}
