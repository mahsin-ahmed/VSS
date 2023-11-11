import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { IndividualConfig } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService, toastPayload } from 'src/app/services/common.service';

@Component({
  selector: 'app-workgroupmember',
  templateUrl: './workgroupmember.component.html',
  styleUrls: ['./workgroupmember.component.css']
})
export class WorkgroupmemberComponent {

  isList: boolean = true;
  isNew: boolean = true;
  phone: string = '';
  toast!: toastPayload;

  constructor(private cs: CommonService,
    private httpClient: HttpClient,
    public authService: AuthService) {
    this.get();
    this.getEmployee();
    this.getWorkGroup();
  }

  get() {
    const oHttpHeaders = new HttpHeaders(
      {
        'Token': this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/WorkGroupEmp?pi=' + this.pageIndex + '&ps=' + this.pageSize + '&phone=' + this.phone, { headers: oHttpHeaders }).subscribe((res) => {
      if (res) {
        this.listWorkGroupMember = res;

        //#region paging
        this.rowCount = this.listWorkGroupMember.length > 0 ? this.listWorkGroupMember[0].RowCount : 0;
        this.totalRowsInList = this.listWorkGroupMember.length;
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

  getWorkGroup() {

    const oHttpHeaders = new HttpHeaders(
      {
        'Token': this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/WorkGroup/GetWorkGroup', { headers: oHttpHeaders }).subscribe((res) => {
      this.listWorkGroup = res;
    });
  };
  getEmployee() {
    const oHttpHeaders = new HttpHeaders(
      {
        'Token': this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/Employee/GetEmployee', { headers: oHttpHeaders }).subscribe((res) => {
      this.listEmployee = res;
    });
  };

  validateForm():boolean{
    var isValid:boolean=true;
    if(this.WorkGroupMember.WgId==undefined||this.WorkGroupMember.WgId==null||this.WorkGroupMember.WgId==0){
      isValid = false;
      this.showMessage('warning', 'WorkGroup Name is required.');
    }
    if(this.WorkGroupMember.EmpId==undefined||this.WorkGroupMember.EmpId==null||this.WorkGroupMember.EmpId==0){
      isValid = false;
      this.showMessage('warning', 'Employee Name is required.');
    }
    return isValid
  }

  add() {
    if(!this.validateForm()){
      return;
    }
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    //this.Brand.CreateBy = this.authService.UserInfo.UserID;
    this.httpClient.post(this.authService.baseURL + '/api/WorkGroupEmp', this.WorkGroupMember,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res == true){
        this.isList = true;
        this.get();
        this.reset();
        this.showMessage('success', 'data added.');
      }else{
        this.showMessage('error', 'error occurred.');
      }
    });
  }

  edit(item: any) { };

  reset() {
    this.WorkGroupMember ={
      WgId:0,
      WgName:'',
      EmpId:0,
      FirstName:'',
      MiddleName:'',
      LastName:'',
    };
  }
  update() { };
  remove(item: any) { };
  search() { };

  listWorkGroupMember: any = [];

  WorkGroupMember: {
    WgId: number,
    WgName: string,
    EmpId: number,
    FirstName: string,
    MiddleName: string,
    LastName: string,
  } = {
      WgId: 0,
      WgName: '',
      EmpId: 0,
      FirstName: '',
      MiddleName: '',
      LastName: '',
    };

  listWorkGroup: any = [];
  WorkGroup: {
    WgId: number,
    WgName: string,
  } = {
      WgId: 0,
      WgName: ''
    };

  listEmployee: any = [];


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
