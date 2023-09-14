import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/services/common.service';

@Component({
  selector: 'app-menupermission',
  templateUrl: './menupermission.component.html',
  styleUrls: ['./menupermission.component.css']
})
export class MenupermissionComponent { 
  constructor(private cs: CommonService, private httpClient: HttpClient) {
  this.get();
}
  isList: boolean = true;
  baseUrl: string = 'http://localhost:56297';
  UserRole:any=[];
  listRole:any=[];
  listMenuPermission:any=[
    {MenuId:1, MenuName:'Job Card'},
    {MenuId:2,MenuName:'Client'}
  ];

  get() {
    this.httpClient.get(this.baseUrl + '/api/Role').subscribe((res) => {
      this.listRole = res;
    });
  };

  setRole(item:any):void{
    this.getMenuPermission(item.RoleId);
    this.listRole = item;
    this.isList = false;
  }

  getMenuPermission(RoleId:number){
    this.httpClient.get(this.baseUrl + '/api/MenuPermission/GetMenuPermission?RoleId='+RoleId).subscribe((res) => {
      this.listMenuPermission = res;
    });
  }


  add(){
    //console.log(this.listMenuPermission);
    this.httpClient.post(this.baseUrl + '/api/MenuPermission', this.listMenuPermission).subscribe((res) => {
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
//--------------------------------------------------------------------
// Start Common part


switchView(view: string): void {
  if (view == 'form') {
    this.isList = false;
  } else {
    this.isList = true;
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
