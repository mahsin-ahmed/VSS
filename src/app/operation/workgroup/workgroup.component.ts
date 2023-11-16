import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { IndividualConfig } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService, toastPayload } from 'src/app/services/common.service';

@Component({
  selector: 'app-workgroup',
  templateUrl: './workgroup.component.html',
  styleUrls: ['./workgroup.component.css']
})
export class WorkgroupComponent {
  
  isList:boolean=true;
  isNew:boolean = true;
  phone:string = '';
  toast!: toastPayload;

  constructor(private cs:CommonService,
    private httpClient: HttpClient,
    public authService:AuthService) { 
    this.get();
  }

  get(){
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.httpClient.get(this.authService.baseURL + '/api/WorkGroup?pi='+this.pageIndex+'&ps='+this.pageSize+'&phone='+this.phone,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res){
        this.listWorkGroup = res;
        //#region paging
        this.rowCount = this.listWorkGroup.length > 0 ? this.listWorkGroup[0].RowCount : 0;
        this.totalRowsInList = this.listWorkGroup.length;
        this.pager.totalPages = Math.ceil(this.rowCount / this.pageSize);
        this.pager.pages = [];
        for(var i = 0; i<this.pager.totalPages; i++){
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
    if(this.WorkGroup.WgName==undefined||this.WorkGroup.WgName==null||this.WorkGroup.WgName==''){
      isValid = false;
      this.showMessage('warning', 'WorkGroup Name is required.');
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
    this.httpClient.post(this.authService.baseURL + '/api/WorkGroup', this.WorkGroup,{headers: oHttpHeaders}).subscribe((res)=>{
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
  search(){};

  reset() {
    this.WorkGroup ={
      WgId:0,
    WgName:'',
    };
  }
  edit(item:any){
    this.WorkGroup ={
      WgId:item.WgId,
      WgName:item.WgName,
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
    this.httpClient.put(this.authService.baseURL + '/api/WorkGroup', this.WorkGroup,{headers: oHttpHeaders}).subscribe((res)=>{
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
    this.httpClient.delete(this.authService.baseURL + '/api/WorkGroup/' + this.WorkGroup.WgId,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res == true){
        this.get();
        this.showMessage('success', 'data removed.');
      }else{
        this.showMessage('error', 'error occurred.');
      }
    });    
  }

  listWorkGroup:any=[];
  WorkGroup:{
    WgId:number,
    WgName:string,
  }={
    WgId:0,
    WgName:''
  };


  //type: 'success', 'error', 'warning', 'info'
  //message: '<span>Action in '+type+'</span>',
  showMessage(type: string, message:string) {
    this.toast = {
      message:message,
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
  pageSize:number = 10;
  rowCount:number = 0;
  listPageSize:any = [5,10,20];
  pageStart:number = 0;
  pageEnd:number = 0;
  totalRowsInList:number=0;
  pagedItems:any = [];
  pager:{
    pages:any,
    totalPages:number
  } = {
    pages:[],
    totalPages:0
  };  

  changePageSize(){
    this.pageIndex = 0;
    this.get();
  }

  changePageNumber(pageIndex:number){
    this.pageIndex = pageIndex;
    this.get();
  }
  //#endregion
}
