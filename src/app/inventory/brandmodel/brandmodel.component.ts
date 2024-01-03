import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { IndividualConfig } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService, toastPayload } from 'src/app/services/common.service';

@Component({
  selector: 'app-brandmodel',
  templateUrl: './brandmodel.component.html',
  styleUrls: ['./brandmodel.component.css']
})
export class BrandmodelComponent {
  isList:boolean=true;
  isNew:boolean = true;
  phone:string = '';
  toast!: toastPayload;

  constructor(private cs:CommonService,
    private httpClient: HttpClient,
    public authService:AuthService) { 
    this.get();
    this.getBrnadName();
  }

  brandId:number=0;
  get(){
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.httpClient.get(this.authService.baseURL + '/api/BrandModel?brandId='+this.brandId+'&pi='+this.pageIndex+'&ps='+this.pageSize,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res){
        this.listBrandModel = res;       
      //#region paging
      this.rowCount = this.listBrandModel.length > 0 ? this.listBrandModel[0].RowCount : 0;
      this.totalRowsInList = this.listBrandModel.length;
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
  getBrnadName(){
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.httpClient.get(this.authService.baseURL + '/api/Brand?pi='+this.pageIndex+'&ps='+this.pageSize,{headers: oHttpHeaders}).subscribe((res)=>{
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
    
    if(this.BrandModel.ModelCode==undefined||this.BrandModel.ModelCode==null||this.BrandModel.ModelCode==''){
      isValid = false;
      this.showMessage('warning', 'Model code is required.');
    }
    if(this.BrandModel.BrandId==undefined||this.BrandModel.BrandId==null||this.BrandModel.BrandId==0){
      isValid = false;
      this.showMessage('warning', 'Brand name ID is required.');
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
    this.httpClient.post(this.authService.baseURL + '/api/BrandModel', this.BrandModel,{headers: oHttpHeaders}).subscribe((res)=>{
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

  edit(item: any) {
    this.BrandModel = {
      "Id":item.Id,
      "BrandId":item.BrandId,
      "ModelCode":item.ModelCode,
      "Remarks":item.Remarks,
    };
    this.isList = false;
  }

  update() {
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    //this.Job.CreateBy = this.authService.UserInfo.UserID;
    this.httpClient.put(this.authService.baseURL + '/api/BrandModel', this.BrandModel,{headers: oHttpHeaders}).subscribe((res) => {
      if (res == true) {
        this.isList = true;
        this.get();
        this.showMessage('success', 'data updated.');
      } else {
        this.showMessage('error', 'error occurred.');
      }
    });
  }

  remove(item:any){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.delete(this.authService.baseURL + '/api/BrandModel/' + this.BrandModel.Id,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res == true){
        this.get();
        this.showMessage('success', 'data removed.');
      }else{
        this.showMessage('error', 'error occurred.');
      }
    });    
  }
  reset() {
    this.BrandModel = {
      Id: 0,
      BrandId: 0,
      ModelCode: '',
      Remarks:'',
    };
  }
  search(){};

  listBrandModel:any =[];
  listBrand:any =[];

  BrandModel:{
    "Id":number,
    "BrandId":number,
    "ModelCode":string,
    "Remarks":string,
  }={
    "Id":0,
    "BrandId":0,
    "ModelCode":'',
    "Remarks":'',
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
