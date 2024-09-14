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
          //#region Pagination 2
          this.rowCount = this.listWorkGroupMember.length > 0 ? this.listWorkGroupMember[0].RowCount : 0;
          this.totalRowsInList = this.listWorkGroupMember.length;
          this.pager.totalPages = Math.ceil(this.rowCount / this.pageSize);
          this.pager.pagesSource = [];
          for(var i = 0; i < this.pager.totalPages; i++){
            this.pager.pagesSource.push(i+1);
          }
          this.pager.pages = [];
          var pagerIn = this.pager.totalPages < this.pagerIndex ? this.pager.totalPages : this.pagerIndex;
          this.pageDot = this.pager.totalPages < this.pagerIndex ? false : true;
          for(var i = this.pagerIndex - this.pageIndexSize; i < pagerIn; i++) {
            this.pager.pages.push(i+1);
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
  }

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

  edit(item:any){
    this.WorkGroupMember ={
      Id:item.Id,
      WgId:item.WgId,
      WgName:item.WgName,
      EmpId:item.EmpId,
      FirstName:item.FirstName,
      MiddleName:item.MiddleName,
      LastName:item.LastName,
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
    //this.Brand.UpdateBy = this.authService.UserInfo.UserID;
    this.httpClient.put(this.authService.baseURL + '/api/WorkGroupEmp', this.WorkGroupMember,{headers: oHttpHeaders}).subscribe((res)=>{
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
    this.httpClient.delete(this.authService.baseURL + '/api/WorkGroupEmp/' + this.WorkGroupMember.Id,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res == true){
        this.get();
        this.showMessage('success', 'data removed.');
      }else{
        this.showMessage('error', 'error occurred.');
      }
    });    
  }

  reset():void {
    this.WorkGroupMember ={
      Id:0,
      WgId:0,
      WgName:'',
      EmpId:0,
      FirstName:'',
      MiddleName:'',
      LastName:'',
    };
  }

  search() :void{
    this.get();
   };

  listWorkGroupMember: any = [];

  WorkGroupMember: {
    Id:number,
    WgId: number,
    WgName: string,
    EmpId: number,
    FirstName: string,
    MiddleName: string,
    LastName: string,
  } = {
      Id:0,
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

  //#region Pagination 1
  pageIndex: number = 0;
  pageSize:number = 10;
  rowCount:number = 0;
  listPageSize:any = [5,10,20];
  pageStart:number = 0;
  pageEnd:number = 0;
  totalRowsInList:number=0;
  pagedItems:any = [];
  pager:{
    pagesSource:any,
    pages:any,
    totalPages:number
  } = {
    pagesSource:[],
    pages:[],
    totalPages:0
  };  
  changePageSize(){
    this.pageIndex = 0;
    this.pagerIndex = 10;
    this.get();
  }
  changePageNumber(pageIndex:number){
    this.pageIndex = pageIndex;
    this.pagerIndex = pageIndex < 10 ? 10 : Math.ceil((pageIndex + 1) / this.pageIndexSize) * this.pageIndexSize;
    this.get();
  }
  pageIndexSize:number = 10;
  pagerIndex:number = 10;
  pageDot:boolean=true;
  //#endregion
}
