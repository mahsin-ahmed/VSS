import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { IndividualConfig } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService, toastPayload } from 'src/app/services/common.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {
  
  isList:boolean=true;
  isNew:boolean = true;
  phone:string = '';

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
    this.httpClient.get(this.authService.baseURL + '/api/Supplier?pi='+this.pageIndex+'&ps='+this.pageSize+'&phone='+this.phone,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res){
        this.listSupplier = res;
      }else{
        this.showMessage('warning', 'Session expired, please login.');
      }
    });
  }

  validateForm():boolean{
    var isValid:boolean=true;
    if(this.Supplier.Name==undefined||this.Supplier.Name==null||this.Supplier.Name==''){
      isValid = false;
      this.showMessage('warning', 'Supplier Name is required.');
    }
    if(this.Supplier.Phone==undefined||this.Supplier.Phone==null||this.Supplier.Phone==''){
      isValid = false;
      this.showMessage('warning', 'Supplier Phone is required.');
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
    this.Supplier.CreateBy = this.authService.UserInfo.UserID;
    this.httpClient.post(this.authService.baseURL + '/api/Supplier', this.Supplier,{headers: oHttpHeaders}).subscribe((res)=>{
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
    this.Supplier ={
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

  update() {
    if(!this.validateForm()){
      return;
    }
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.Supplier.UpdateBy = this.authService.UserInfo.UserID;
    this.httpClient.put(this.authService.baseURL + '/api/Supplier', this.Supplier,{headers: oHttpHeaders}).subscribe((res)=>{
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
    this.Supplier ={
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
  search(){};
  remove(item:any){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.delete(this.authService.baseURL + '/api/Supplier/' + this.Supplier.BpId,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res == true){
        this.get();
        this.showMessage('success', 'data removed.');
      }else{
        this.showMessage('error', 'error occurred.');
      }
    });    
  }

  listSupplier:any=[];

  Supplier :{
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

  toast!: toastPayload;

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
