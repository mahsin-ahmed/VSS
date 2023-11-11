import { Component } from '@angular/core';
import { CommonService, toastPayload } from '../../services/common.service';
import { IndividualConfig } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  isNew:boolean = true;
  isList:boolean=true;
  
  Client :{
    BpId:number,
    Name:string,
    Address:string,
    Phone:string,
    Email:string,
    BpTypeId:number,
    IsActive:boolean,
    CreateDate:'',
    CreateBy:number,
    UpdateDate:'',
    UpdateBy:number,
    IsDelete:boolean,
    DeleteDate:'',
    DeleteBy:number,
    MembershipNo:string,
    ContactPerson:string,
    ContactPersonNo:string,
    ClientInfo:string
    }={
    BpId:0,
    Name:'',
    Address:'',
    Phone:'',
    Email:'',
    BpTypeId:0,
    IsActive:false,
    CreateDate:'',
    CreateBy:0,
    UpdateDate:'',
    UpdateBy:0,
    IsDelete:false,
    DeleteDate:'' ,
    DeleteBy:0,
    MembershipNo :'',
    ClientInfo:'',
    ContactPerson:'',
    ContactPersonNo:''
    };
  listClient:any = [];
  toast!: toastPayload;
  constructor(private cs:CommonService,
    private httpClient: HttpClient,
    public authService:AuthService) { 
    this.get();
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
  //baseUrl:string='http://localhost:56297';
  phone:string = '';
  get(){
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.httpClient.get(this.authService.baseURL + '/api/Client?pi='+this.pageIndex+'&ps='+this.pageSize+'&phone='+this.phone,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res){
        this.listClient = res;
      }else{
        this.showMessage('warning', 'Session expired, please login.');
      }
    });
  }

  validateForm():boolean{
    var isValid:boolean=true;
    if(this.Client.Name==undefined||this.Client.Name==null||this.Client.Name==''){
      isValid = false;
      this.showMessage('warning', 'Client Name is required.');
    }
    if(this.Client.Phone==undefined||this.Client.Phone==null||this.Client.Phone==''){
      isValid = false;
      this.showMessage('warning', 'Client Phone is required.');
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
    this.Client.CreateBy = this.authService.UserInfo.UserID;
    this.httpClient.post(this.authService.baseURL + '/api/Client', this.Client,{headers: oHttpHeaders}).subscribe((res)=>{
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

  update() {
    if(!this.validateForm()){
      return;
    }
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.Client.UpdateBy = this.authService.UserInfo.UserID;
    this.httpClient.put(this.authService.baseURL + '/api/Client', this.Client,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res == true){
        this.isList = true;
        this.get();
        this.showMessage('success', 'data updated.');
      }else{
        this.showMessage('error', 'error occurred.');
      }
    });
  }

  reset() {
    this.Client ={
    BpId:0,
    Name:'',
    Address:'',
    Phone:'',
    Email:'',
    BpTypeId:0,
    IsActive:false,
    CreateDate:'',
    CreateBy:0,
    UpdateDate:'',
    UpdateBy:0,
    IsDelete:false,
    DeleteDate:'' ,
    DeleteBy:0,
    MembershipNo :'',
    ClientInfo:'',
    ContactPerson:'',
    ContactPersonNo:''
    };
  }

  edit(item:any){
    this.Client ={
      BpId:item.BpId,
      Name:item.Name,
      Address:item.Address,
      Phone:item.Phone,
      Email:item.Email,
      BpTypeId:item.BpTypeId,
      IsActive:item.IsActive,
      CreateDate:item.CreateDate,
      CreateBy:item.CreateBy,
      UpdateDate:item.UpdateDate,
      UpdateBy:item.UpdateBy,
      IsDelete:item.IsDelete,
      DeleteDate:item.DeleteDate,
      DeleteBy:item.DeleteBy,
      MembershipNo :item.MembershipNo,
      ClientInfo:item.ClientInfo,
      ContactPerson:item.ContactPerson,
      ContactPersonNo:item.ContactPersonNo
      };
      this.isList = false;
  }

  remove(item:any){
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.httpClient.delete(this.authService.baseURL + '/api/Client/' + this.Client.BpId,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res == true){
        this.get();
        this.showMessage('success', 'data removed.');
      }else{
        this.showMessage('error', 'error occurred.');
      }
    });    
  }

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

  search():void{
    this.get();
  }

}