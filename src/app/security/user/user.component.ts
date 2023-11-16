import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { IndividualConfig } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService, toastPayload } from 'src/app/services/common.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  isList: boolean = true;
  isNew: boolean = true;
  phone: string = '';
  toast!: toastPayload;

  constructor(private cs: CommonService,
    private httpClient: HttpClient,
    public authService: AuthService) {
    this.get();
  }

  get() {
    const oHttpHeaders = new HttpHeaders(
      {
        'Token': this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/User?pi=' + this.pageIndex + '&ps=' + this.pageSize + '&phone=' + this.phone, { headers: oHttpHeaders }).subscribe((res) => {
      if (res) {
        this.listUser = res;
        //#region paging
        this.rowCount = this.listUser.length > 0 ? this.listUser[0].RowCount : 0;
        this.totalRowsInList = this.listUser.length;
        this.pager.totalPages = Math.ceil(this.rowCount / this.pageSize);
        this.pager.pages = [];
        for (var i = 0; i < this.pager.totalPages; i++) {
          this.pager.pages.push(i + 1);
        }
        this.pageStart = (this.pageIndex * this.pageSize) + 1;
        this.pageEnd = (this.pageStart - 1) + this.totalRowsInList;
        //#endregion
      } else {
        this.showMessage('warning', 'Session expired, please login.');
      }
    });
  }

  validateForm(): boolean {
    var isValid: boolean = true;
    if (this.User.UserCode == undefined || this.User.UserCode == null || this.User.UserCode == '') {
      isValid = false;
      this.showMessage('warning', 'User code is required.');
    }
    if (this.User.UserName == undefined || this.User.UserName == null || this.User.UserName == '') {
      isValid = false;
      this.showMessage('warning', 'User code is required.');
    }
    if (this.User.UserPass == undefined || this.User.UserPass == null || this.User.UserPass == '') {
      isValid = false;
      this.showMessage('warning', 'User password is required.');
    }
    return isValid;
  }

  add() {
    if (!this.validateForm()) {
      return;
    }
    const oHttpHeaders = new HttpHeaders(
      {
        'Token': this.authService.UserInfo.Token
      });
    this.User.CreateBy = this.authService.UserInfo.UserID;
    this.httpClient.post(this.authService.baseURL + '/api/User', this.User, { headers: oHttpHeaders }).subscribe((res) => {
      if (res == true) {
        this.isList = true;
        this.get();
        this.reset();
        this.showMessage('success', 'data added.');
      } else {
        this.showMessage('error', 'error occurred.');
      }
    });
  }

  edit(item: any) {
    this.User = {
      UserID: item.UserID,
      UserCode:  item.UserCode,
      UserName:  item.UserName,
      UserPass: item.UserPass,
      FirstName:  item.FirstName,
      MiddleName: item.MiddleName,
      LastName:  item.LastName,
      Email:  item.Email,
      MobileNo:  item.MobileNo,
      PhoneNo:  item.PhoneNo,
      IsActive:item.IsActive,
      CreateBy:  0,
      UpdateBy:0,
    };
    this.isList = false;
  }

  update() {
    if(!this.validateForm()){
      return;
    }
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.User.UpdateBy = this.authService.UserInfo.UserID;
    this.httpClient.put(this.authService.baseURL + '/api/User', this.User,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res == true){
        this.isList = true;
        this.get();
        this.showMessage('success', 'data updated.');
      }else{
        this.showMessage('error', 'error occurred.');
      }
    });
  }

  
  remove(item:any){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.delete(this.authService.baseURL + '/api/User/' + this.User.UserID,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res == true){
        this.get();
        this.showMessage('success', 'data removed.');
      }else{
        this.showMessage('error', 'error occurred.');
      }
    });    
  }
  search() { };


  listUser: any = [];
  User: {
    UserID: number,
    UserCode: string,
    UserName: string,
    UserPass:string,
    FirstName: string,
    MiddleName: string,
    LastName: string,
    Email: string,
    MobileNo: string,
    PhoneNo: string,
    IsActive:boolean,
    CreateBy: number,
    UpdateBy:number,
  } = {
      UserID: 0,
      UserCode: '',
      UserName: '',
      UserPass: '',
      FirstName: '',
      MiddleName: '',
      LastName: '',
      Email: '',
      MobileNo: '',
      PhoneNo: '',
      IsActive:true,
      CreateBy: 0,
      UpdateBy:0,
    };
  reset() {
    this.User = {
      UserID: 0,
      UserCode: '',
      UserName: '',
      UserPass: '',
      FirstName: '',
      MiddleName: '',
      LastName: '',
      Email: '',
      MobileNo: '',
      PhoneNo: '',
      IsActive:true,
      CreateBy: 0,
      UpdateBy:0
    };
  }
  //type: 'success', 'error', 'warning', 'info'
  //message: '<span>Action in '+type+'</span>',
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

  changePageSize() {
    this.pageIndex = 0;
    this.get();
  }

  changePageNumber(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.get();
  }
  //#endregion
}
