import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/services/common.service';

@Component({
  selector: 'app-userrole',
  templateUrl: './userrole.component.html',
  styleUrls: ['./userrole.component.css']
})
export class UserroleComponent {

  constructor(private cs: CommonService, private httpClient: HttpClient) {
    this.get();
  }

  isList: boolean = true;
  baseUrl: string = 'http://localhost:56297';
  UserRole:any=[];
  listUser:any=[];
  listUserRole:any=[];

  get() {
    this.httpClient.get(this.baseUrl + '/api/User').subscribe((res) => {
      this.listUser = res;
    });
  };

  getUserRole(userId:number){
    this.httpClient.get(this.baseUrl + '/api/UserRole/GetUserRole?userId='+userId).subscribe((res) => {
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
    this.httpClient.post(this.baseUrl + '/api/UserRole', this.listUserRole).subscribe((res) => {
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
