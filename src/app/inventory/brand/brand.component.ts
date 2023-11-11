import { Component } from '@angular/core';
import { CommonService, toastPayload } from '../../services/common.service';
import { IndividualConfig } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent {
  
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
    this.httpClient.get(this.authService.baseURL + '/api/Brand?pi='+this.pageIndex+'&ps='+this.pageSize+'&phone='+this.phone,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res){
        this.listBrand = res;
        
      //#region paging
      this.rowCount = this.listBrand.length > 0 ? this.listBrand[0].RowCount : 0;
      this.totalRowsInList = this.listBrand.length;
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
    if(this.Brand.Code==undefined||this.Brand.Code==null||this.Brand.Code==0){
      isValid = false;
      this.showMessage('warning', 'Brand code is required.');
    }
    if(this.Brand.Name==undefined||this.Brand.Name==null||this.Brand.Name==''){
      isValid = false;
      this.showMessage('warning', 'Brand name is required.');
    }
    if(this.Brand.Country==undefined||this.Brand.Country==null||this.Brand.Country==''){
      isValid = false;
      this.showMessage('warning', 'Brand Country is required.');
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
    this.Brand.CreateBy = this.authService.UserInfo.UserID;
    this.httpClient.post(this.authService.baseURL + '/api/Brand', this.Brand,{headers: oHttpHeaders}).subscribe((res)=>{
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

  reset() {
    this.Brand ={
    Id:0,
    Code:0,
    Name:'',
    Country:'',
    Remarks:'',
    IsActive:false,
    CreateDate:'',
    CreateBy:0,
    UpdateDate:'',
    UpdateBy:0,
    };
  }
  edit(item:any){
    this.Brand ={
      Id:item.Id,
      Code:item.Code,
      Name:item.Name,
      Country:item.Country,
      Remarks:item.Remarks,
      IsActive:item.IsActive,
      CreateDate:item.CreateDate,
      CreateBy:item.CreateBy,
      UpdateDate:item.UpdateDate,
      UpdateBy:item.UpdateBy,
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
    this.Brand.UpdateBy = this.authService.UserInfo.UserID;
    this.httpClient.put(this.authService.baseURL + '/api/Brand', this.Brand,{headers: oHttpHeaders}).subscribe((res)=>{
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
    this.httpClient.delete(this.authService.baseURL + '/api/Brand/' + this.Brand.Id,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res == true){
        this.get();
        this.showMessage('success', 'data removed.');
      }else{
        this.showMessage('error', 'error occurred.');
      }
    });    
  }
  search(){};

  Brand:{
    Id:number,
    Code:number,
    Name:string,
    Country:string,
    Remarks:string,
    CreateBy:number,
    IsActive:boolean,
    CreateDate:'',
    UpdateDate:'',
    UpdateBy:number,
  }={
    Id:0,
    Code:0,
    Name:'',
    Country:'',
    Remarks:'',
    CreateBy:0,
    IsActive:false,
    CreateDate:'',
    UpdateDate:'',
    UpdateBy:0,
  };
  listBrand:any =[
    {
      "Id":1,
      "Code":"001",
      "Name":"Toyota",
    },{
      "Id":2,
      "Code":"002",
      "Name":"BMW"}];
  

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
