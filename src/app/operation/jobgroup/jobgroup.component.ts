import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/services/common.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-jobgroup',
  templateUrl: './jobgroup.component.html',
  styleUrls: ['./jobgroup.component.css']
})
export class JobgroupComponent {
  constructor(private cs: CommonService, 
    private httpClient: HttpClient,
    public authService:AuthService) {
    this.get();
  }
  isList: boolean = true;
  // Job-group object declaration
  listJobGroup: any = [];
  
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
  // getting data from database for display
  //baseUrl: string = 'http://localhost:56297';

  get() {
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/JobGroup?pi='+this.pageIndex+'&ps='+this.pageSize,{headers: oHttpHeaders}).subscribe((res) => {
      if(res){
        this.listJobGroup = res;
          //#region Pagination 2
          this.rowCount = this.listJobGroup.length > 0 ? this.listJobGroup[0].RowCount : 0;
          this.totalRowsInList = this.listJobGroup.length;
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
      }else{
        this.showMessage('warning', 'Session expired, please login.');
      }
    });
  }

  validateForm():boolean{
    var isValid:boolean=true;
    if(this.JobGroup.GroupId==undefined||this.JobGroup.GroupId==null||this.JobGroup.GroupId==0){
      isValid = false;
      this.showMessage('warning', 'Job Group Name is required.');
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
    this.httpClient.post(this.authService.baseURL + '/api/JobGroup', this.JobGroup,{headers: oHttpHeaders}).subscribe((res) => {
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
  update() { 
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      }); 
    this.httpClient.put(this.authService.baseURL + '/api/JobGroup', this.JobGroup,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res == true){
          this.isList = true;
          this.get();
          this.showMessage('success', 'data updated.');
      } else{
          this.showMessage('error', 'error occurred.');
        }
    });
  }

  remove(item:any){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.delete(this.authService.baseURL + '/api/JobGroup/' + item.GroupId,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res == true){
        this.get();
        this.showMessage('success', 'data removed.');
      }else{
        this.showMessage('error', 'error occurred.');
      }
    });  
  }

  JobGroup: {
    GroupId: number,
    Name: string
  } = {
      GroupId: 0,
      Name: ''
    };

  reset() {
    this.JobGroup ={
      GroupId: 0,
      Name:''
    };
  }

  edit(item: any) {
    this.JobGroup = {
      GroupId:item.GroupId,
      Name:item.Name
    };
    this.isList = false;
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

  switchView(view: string): void {
    if (view == 'form') {
      this.isList = false;
    } else {
      this.isList = true;
      this.reset();
      this.pageIndex = 0;
      this.get();
    }
  }
}

export interface Company {
  CompanyId:number,
  CompanyCode:string,
  CompanyName:string,
  Description:string,
  DateFormat:string,
  DecimalPlace:number,
  Bay:number,
  Vat:number,
  Address:string,
  Phone:string,
  Email:string,
  Website:string,
  IsActive:boolean,
  Logos:[]
}