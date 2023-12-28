import { Component } from '@angular/core';
import { CommonService, toastPayload } from '../../services/common.service';
import { IndividualConfig } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-jc-req',
  templateUrl: './jc-req.component.html',
  styleUrls: ['./jc-req.component.css']
})
export class JcReqComponent {
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
    this.httpClient.get(this.authService.baseURL + '/api/JcReq?pi='+this.pageIndex+'&ps='+this.pageSize,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res){
        this.listJcReq = res;
        //#region paging
        this.rowCount = this.listJcReq.length > 0 ? this.listJcReq[0].RowCount : 0;
        this.totalRowsInList = this.listJcReq.length;
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

  reset() {
    this.jcReq ={
      Id:0,
      ReadBy:0,
      IsRead:false
    };
  }

  edit(item:any):void {
    var isConfirm = confirm('Are your to submit?');
    if(isConfirm === true) {
      this.jcReq ={
        Id:item.Id,
        ReadBy:item.ReadBy,
        IsRead:item.IsRead
      };  
      this.update();
    }
  }

  update():void {
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.jcReq.IsRead = true;
    this.jcReq.ReadBy = this.authService.UserInfo.UserID;
    this.httpClient.put(this.authService.baseURL + '/api/JcReq', this.jcReq,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res == true){
        this.isList = true;
        this.get();
        this.showMessage('success', 'data updated.');
      }else{
        this.showMessage('error', 'error occurred.');
      }
    });
  }

  search(): void {

  }

  listJcReq:any =[];
  //type: 'success', 'error', 'warning', 'info'
  //message: '<span>Action in '+type+'</span>',
  showMessage(type: string, message:string):void {
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

  changePageSize():void{
    this.pageIndex = 0;
    this.get();
  }

  changePageNumber(pageIndex:number):void{
    this.pageIndex = pageIndex;
    this.get();
  }
  //#endregion

  jcReq:JcReq={
    Id:0,
    IsRead:false,
    ReadBy:0
  };
}

export interface JcReq{
  Id:number
  IsRead:boolean,
  ReadBy:number
}
