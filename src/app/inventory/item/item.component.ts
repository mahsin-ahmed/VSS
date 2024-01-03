import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { CommonService,toastPayload } from 'src/app/services/common.service';
import { IndividualConfig } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  constructor(private cs: CommonService, 
    private httpClient: HttpClient,
    private authService:AuthService) {
    this.get();
    this.getBrand();
    //this.getItemCategory();
  }

  oItem: Item={
    Id:0,
    ItemName:'',
    BrandId:0,
    ModelId:0,
    PartNoOld:'',
    PartNoNew:'',
    Remarks:'',
    IsActive:false,
    CreateBy:0,
    CreateAt:'',
  }

  listBrand:any=[];
  getBrand(){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/Item/GetBrand',{headers: oHttpHeaders}).subscribe((res)=>{
        this.listBrand = res;
    });
  }

  listItemCategory:any=[];
  getItemCategory(){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/Item/GetItemCategory',{headers: oHttpHeaders}).subscribe((res)=>{
        this.listItemCategory = res;
    });
  }

  //GetBrandModel
  listBrandModel:any=[];
  getBrandModel(){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/Item/GetBrandModel?id='+this.oItem.BrandId,{headers: oHttpHeaders}).subscribe((res)=>{
        this.listBrandModel = res;
    });
  }

  listItems:any =[];
  get(){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      }); 
    this.httpClient.get(this.authService.baseURL + '/api/Item?pi='+this.pageIndex+'&ps='+this.pageSize,{headers: oHttpHeaders}).subscribe((res) => {
      this.listItems = res;
      //#region paging
      this.rowCount = this.listItems.length > 0 ? this.listItems[0].RowCount : 0;
      this.totalRowsInList = this.listItems.length;
      this.pager.totalPages = Math.ceil(this.rowCount / this.pageSize);
      this.pager.pages = [];
      for(var i = 0; i<this.pager.totalPages; i++){
        this.pager.pages.push(i+1);
      }
      this.pageStart = (this.pageIndex * this.pageSize) + 1;
      this.pageEnd = (this.pageStart - 1) + this.totalRowsInList;
      //#endregion
    });

  };

  validateForm():boolean{
    var isValid:boolean=true;
    
    if(this.oItem.PartNoNew==undefined||this.oItem.PartNoNew==null||this.oItem.PartNoNew==''){
      isValid = false;
      this.showMessage('warning', 'PartNo New is required.');
    }
    if(this.oItem.PartNoOld==undefined||this.oItem.PartNoOld==null||this.oItem.PartNoOld==''){
      isValid = false;
      this.showMessage('warning', 'PartNo Old is required.');
    }
    if(this.oItem.ModelId==undefined||this.oItem.ModelId==null||this.oItem.ModelId==0){
      isValid = false;
      this.showMessage('warning', 'Model is required.');
    }
    if(this.oItem.BrandId==undefined||this.oItem.BrandId==null||this.oItem.BrandId==0){
      isValid = false;
      this.showMessage('warning', 'Brand name is required.');
    }
    if(this.oItem.ItemName==undefined||this.oItem.ItemName==null||this.oItem.ItemName==''){
      isValid = false;
      this.showMessage('warning', 'Item Name is required.');
    }
   
    return isValid
  }

  addItem() {
    if(!this.validateForm()){
      return;
    }
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.oItem.CreateBy = this.authService.UserInfo.UserID;
    this.httpClient.post(this.authService.baseURL + '/api/Item', this.oItem,{headers: oHttpHeaders}).subscribe((res) => {
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
  
  updateItem() {
    if(!this.validateForm()){
      return;
    }
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.oItem.CreateBy = this.authService.UserInfo.UserID;
    this.httpClient.put(this.authService.baseURL + '/api/Item', this.oItem,{headers: oHttpHeaders}).subscribe((res) => {
      if (res == true) {
        this.isList = true;
        this.get();
        this.showMessage('success', 'data updated.');
      } else {
        this.showMessage('error', 'error occurred.');
      }
    });
  }
  removeItem(item:any){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.delete(this.authService.baseURL + '/api/Item/' + item.Id,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res == true){
        this.get();
        this.showMessage('success', 'data removed.');
      }else{
        this.showMessage('error', 'error occurred.');
      }
    });      
  }

  edit(item: any) {
    this.oItem = {
      Id: item.Id,
      ItemName: item.ItemName,
      PartNoOld: item.PartNoOld,
      PartNoNew: item.PartNoNew,
      Remarks: item.Remarks,
      BrandId: item.BrandId,
      CreateBy:item.CreateBy,
      CreateAt:item.CreateAt,
      IsActive:item.IsActive,
      ModelId:item.ModelId
    };
    this.getBrandModel();
    this.isList = false;
  }



  // Pagination part Start
  //----------------------------------------------------------------------------
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
  //#endregion

  changePageSize(){
    this.pageIndex = 0;
    this.get();
  }
  changePageNumber(pageIndex:number){
    this.pageIndex = pageIndex;
    this.get();
  }

  // Pagination part End
  //----------------------------------------------------------------------


  // Start Common part
 
  isList: boolean = true;
  //baseUrl: string = 'http://localhost:56297';

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
  toast!: toastPayload;

  showMessage(type: string, message: string):void {
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

  reset():void {
    this.oItem = {
      Id:0,
      ItemName:'',
      PartNoOld:'',
      PartNoNew:'',
      Remarks:'',
      BrandId:0,
      CreateBy:0,
      CreateAt:'',
      IsActive:false,
      ModelId:0
    };
  }

  changeBrand():void{
    this.getBrandModel();
  }
}

export interface Item{
  Id:number,
  ItemName:string,
  BrandId:number,
  ModelId:number,
  PartNoOld:string,
  PartNoNew:string,
  Remarks:string,
  IsActive:boolean,
  CreateBy:number,
  CreateAt:string,
}
