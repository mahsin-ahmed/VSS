import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/services/common.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-userrole',
  templateUrl: './userrole.component.html',
  styleUrls: ['./userrole.component.css']
})
export class UserroleComponent {

  constructor(private cs: CommonService, 
    private httpClient: HttpClient,
    public authService:AuthService) {
    this.get();
  }

  isList: boolean = true;
  //baseUrl: string = 'http://localhost:56297';
  UserRole:any=[];
  listUser:any=[];
  listUserRole:any=[];

  get() {
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.httpClient.get(this.authService.baseURL + '/api/User',{headers: oHttpHeaders}).subscribe((res) => {
      if(res){
        this.listUser = res;
      }else{
        this.showMessage('warning', 'Session expired, please login.');
      }
    });
  }

  getUserRole(userId:number){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/UserRole/GetUserRole?userId='+userId,{headers: oHttpHeaders}).subscribe((res) => {
      this.listUserRole = res;
    });
  }

  user:any={};
  setRole(item:any):void{
    this.getUserRole(item.UserID);
    this.user = item;
    this.isList = false;
  }

  add(){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.post(this.authService.baseURL + '/api/UserRole', this.listUserRole,{headers: oHttpHeaders}).subscribe((res) => {
      if (res == true) {
        this.isList = true;
        this.get();
        this.showMessage('success', 'data added.');
      } else {
        this.showMessage('error', 'error occurred.');
      }
    });
  }

  // Pagination part Start
  //----------------------------------------------------------------------------
  //#region paging varible
  pageIndex: number = 0;
  pageSize: number = 10;
  rowCount: number = 0;
  listPageSize: any = [5, 10, 20];
  pageStart: number = 0;
  pageEnd: number = 0;
  totalRowsInList: number = 0;
  pagedItems: any = [];
  pager: {
    pages: any,
    totalPages: number
  } = {
      pages: [],
      totalPages: 0
    };
  //#endregion

  changePageSize() {
    this.pageIndex = 0;
    this.get();
  }
  changePageNumber(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.get();
  }

  // Pagination part End
  //----------------------------------------------------------------------
  // Start Common part


  switchView(view: string): void {
    if (view == 'form') {
      this.isList = false;
    } else {
      this.isList = true;
      this.pageIndex = 0;
      this.get();
    }
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
