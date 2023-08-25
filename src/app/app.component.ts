import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
//import { CommonService, toastPayload } from './services/common.service';
//import { IndividualConfig } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'VSS';
  //toast!: toastPayload;
  //isLogIn:boolean = false;
  //userName:string = '';
  userInfo:{
    userName:string,
    isLoggedIn:boolean
  } ={
    userName:'',
    isLoggedIn:false
  };
  constructor(public authService: AuthService, 
    private router: Router
    //,private cs:CommonService
    ) {
    //this.isLogIn = this.authService.isLoggedIn;
    this.userInfo = this.authService.userInfo;
  }
  logout(): void {
    this.authService.logout();
    //this.isLogIn = this.authService.isLoggedIn;
    this.userInfo = this.authService.userInfo;
    this.router.navigate(['/']);
  }

  login():void{
    this.router.navigate(['/login']);
  }

  listModule:any=[
    {
    ModuleId:1,
    ModuleName:''
  }
  ];

  listMenu:any=[
    {
      MenuId:1,
      MenuName:'Home',
      ModuleId:1
    }
  ];

  /*buttonClick(type: string) {
    this.toast = {
      message:'<span>Action in '+type+'</span>',
      title: type.toUpperCase(),
      type: type,
      ic: {
        timeOut: 2500,
        closeButton: true,
      } as IndividualConfig,
    };
    this.cs.showToast(this.toast);
  }*/

}
