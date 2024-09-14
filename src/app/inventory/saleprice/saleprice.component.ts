import { Component } from '@angular/core';
import { CommonService, toastPayload } from '../../services/common.service';
import { IndividualConfig } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-saleprice',
  templateUrl: './saleprice.component.html',
  styleUrls: ['./saleprice.component.css']
})
export class SalepriceComponent {
  isNew:boolean = true;
  isList:boolean=true;
  //listClient:any = [];
  listSalePrice:any = [];
  toast!: toastPayload;
  constructor(private cs:CommonService,
    private httpClient: HttpClient,
    public authService:AuthService) { 
    this.get();
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

  //baseUrl:string='http://localhost:56297';
  partNo:string = '';
  get():void{
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.httpClient.get(this.authService.baseURL + '/api/SalePrice?pi='+this.pageIndex+'&ps='+this.pageSize+'&partNo='+this.partNo,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res){
        this.listSalePrice = res;
        //#region Pagination 2
        this.rowCount = this.listSalePrice.length > 0 ? this.listSalePrice[0].RowCount : 0;
        this.totalRowsInList = this.listSalePrice.length;
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
      } else{
        this.showMessage('warning', 'Session expired, please login.');
      }
    });
  }

  validateForm():boolean{
    var isValid:boolean=true;
    if(this.oSalesPrice.ItemId==undefined||this.oSalesPrice.ItemId==null||this.oSalesPrice.ItemId==0){
      isValid = false;
      this.showMessage('warning', 'Item-Name is required.');
    }
    if(this.oSalesPrice.SalePrice==undefined||this.oSalesPrice.SalePrice==null||this.oSalesPrice.SalePrice==0){
      isValid = false;
      this.showMessage('warning', 'Sale-Price is required.');
    }
    return isValid
  }

  toAdd(item:any){
    this.oSalesPrice ={
      Id:item.Id,
      SalePrice:item.SalePrice,
      ItemId:item.ItemId,
      MinPurchasePrice:item.MinPurchasePrice,
      AvgPurchasePrice:item.AvgPurchasePrice,
      MaxPurchasePrice:item.MaxPurchasePrice,
      Remarks:item.Remarks,
      CreateBy:item.CreateBy,
      IsActive:item.IsActive,
      ItemName:''
    };
    this.isList = false;
  }

  add() {
    if(!this.validateForm()){
      return;
    }
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.oSalesPrice.CreateBy = this.authService.UserInfo.UserID;
    this.httpClient.post(this.authService.baseURL + '/api/SalePrice', this.oSalesPrice,{headers: oHttpHeaders}).subscribe((res)=>{
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
    this.oSalesPrice ={
      Id:0,
      SalePrice:0,
      ItemId:0,
      MinPurchasePrice:0,
      AvgPurchasePrice:0,
      MaxPurchasePrice:0,
      Remarks:'',
      CreateBy:0,
      IsActive:0,
      ItemName:''
    };
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

  oSalesPrice:SalesPrice = {
    Id:0,
    SalePrice:0,
    ItemId:0,
    MinPurchasePrice:0,
    AvgPurchasePrice:0,
    MaxPurchasePrice:0,
    Remarks:'',
    CreateBy:0,
    IsActive:0,
    ItemName:''
  };

  //itemValue:string = '';
  listItemS:any = [];
  //value:string ='';
  searchItem(){
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.httpClient.get(this.authService.baseURL + '/api/JobCard/GetItemByParts?value='+this.partNo,{headers:oHttpHeaders}).subscribe((res)=>{
      this.listItemS = res;
    });
  }

  selectItem(item:any){
    this.oSalesPrice.ItemId=item.Id;
    this.oSalesPrice.ItemName=item.ItemName;
    this.oSalesPrice.SalePrice=item.SalePrice;
    this.oSalesPrice.MinPurchasePrice=item.MinPurchasePrice;
    this.oSalesPrice.AvgPurchasePrice=item.AvgPurchasePrice;
    this.oSalesPrice.MaxPurchasePrice=item.MaxPurchasePrice;
  }

  oItem:Item={
    Id:0,
    ItemCode:'',
    ItemName:'',
    Barcode:'',
    ItemCategoryId:0,
    BrandId:0,
    ModelId:0,
    PartNoOld:'',
    PartNoNew:'',
    BrandName:'',
    ModelCode:'',
    SalePrice:0,
    MinPurchasePrice:0,
    AvgPurchasePrice:0,
    MaxPurchasePrice:0,
    Qty:0
  };

}

export interface SalesPrice{
  Id:number,
  SalePrice:number,
  ItemId:number,
  MinPurchasePrice:number,
  AvgPurchasePrice:number,
  MaxPurchasePrice:number,
  Remarks:string,
  CreateBy:number,
  IsActive:number,
  ItemName:string
}

export interface Item {
  Id:number,
  ItemCode:string,
  ItemName:string,
  Barcode:string,
  ItemCategoryId:number,
  BrandId:number,
  ModelId:number,
  PartNoOld:string,
  PartNoNew:string,
  BrandName:string,
  ModelCode:string,
  SalePrice:number,
  MinPurchasePrice:number,
  AvgPurchasePrice:number,
  MaxPurchasePrice:number,
  Qty:number
}