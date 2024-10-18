import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/services/common.service';
import { AuthService } from 'src/app/auth/auth.service';
import { PurchaseOrder } from 'src/app/models/purchaseorder.model';

@Component({
  selector: 'app-po',
  templateUrl: './po.component.html',
  styleUrls: ['./po.component.css']
})
export class PoComponent {
  public wareHouseId:number=0;
  constructor(private cs: CommonService, 
    private httpClient: HttpClient,
    private authService:AuthService,
    private purchaseOrder:PurchaseOrder) {
    this.get();
    this.getWareHouse();
    //this.getItemName();  
    this.getSuplierName();
    this.purchaseOrder.CreateBy = this.authService.UserInfo.UserID;
    this.purchaseOrder.CreateDate = new Date().toString();
    this.purchaseOrder.UpdateBy = this.authService.UserInfo.UserID;
    this.purchaseOrder.UpdateDate = new Date().toString();
    this.purchaseOrder.DeleteBy = this.authService.UserInfo.UserID;
    this.purchaseOrder.DeleteDate = new Date().toString();

    //this.po.
  }

  //public po:Po;
  
  isList: boolean = true;
  //baseUrl: string = 'http://localhost:56297';

  listWareHouse: any = [];
  //listItem: any = [];
  listSupplier: any = [];
  listStoreReq: any = [];

  reqStatus:number=1;
  storeTranTypeId:number=1
  get() {
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });  
    this.httpClient.get(this.authService.baseURL + '/api/StoreReq?reqStatus='+this.reqStatus+'&storeTranTypeId='+this.storeTranTypeId+'&pi='+this.pageIndex+'&ps='+this.pageSize,{headers: oHttpHeaders}).subscribe((res) => {
      if(res){
        this.listStoreReq = res;
      }else{
        this.showMessage('warning', 'Session expired, please login again.');
      }
    });
  };

  getWareHouse(){
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.httpClient.get(this.authService.baseURL + '/api/WareHouse/getWareHouse',{headers: oHttpHeaders}).subscribe((res)=>{
        this.listWareHouse = res;
    });
  }

  /*getItemName(){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/Item/getItemName',{headers: oHttpHeaders}).subscribe((res)=>{
        this.listItem = res;
    });
  }*/

  getSuplierName(){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/Client/getSuplierName',{headers: oHttpHeaders}).subscribe((res)=>{
        this.listSupplier = res;
    });
  }

  validateForm():boolean{
    var isValid:boolean=true;
    if(this.oStoreReq.WhId==undefined||this.oStoreReq.WhId==null||this.oStoreReq.WhId==0){
      isValid = false;
      this.showMessage('warning', 'Warehouse Name is required.');
    }
    if(this.oStoreReq.Qty==undefined||this.oStoreReq.Qty==null||this.oStoreReq.Qty==0){
      isValid = false;
      this.showMessage('warning', 'Warehouse Name is required.');
    }
    if(this.oStoreReq.ItemId==undefined||this.oStoreReq.ItemId==null||this.oStoreReq.ItemId==0){
      isValid = false;
      this.showMessage('warning', 'Item is required.');
    }
    if(this.oStoreReq.SupplierId==undefined||this.oStoreReq.SupplierId==null||this.oStoreReq.SupplierId==0){
      isValid = false;
      this.showMessage('warning', 'Supplier Name is required.');
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
    this.oStoreReq.StoreTranTypeId = 1; // purchase requisition
    this.oStoreReq.CreateBy = this.authService.UserInfo.UserID;
    this.httpClient.post(this.authService.baseURL + '/api/StoreReq', this.oStoreReq,{headers: oHttpHeaders}).subscribe((res)=>{
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

  update():void {
    if(!this.validateForm()){
      return;
    }
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.oStoreReq.StoreTranTypeId = 1; // purchase requisition
    this.oStoreReq.CreateBy = this.authService.UserInfo.UserID;
    this.httpClient.put(this.authService.baseURL + '/api/StoreReq', this.oStoreReq,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res == true){
        this.isList = true;
        this.get();
        this.showMessage('success', 'data updated.');
      }else{
        this.showMessage('error', 'error occurred.');
      }
    });
  }

  remove(storeReq: any):void {
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.httpClient.delete(this.authService.baseURL + '/api/StoreReq/' + storeReq.Id,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res == true){
        this.get();
        this.showMessage('success', 'data removed.');
      }else{
        this.showMessage('error', 'error occurred.');
      }
    }); 
  }

  edit(item: any) {
    this.oStoreReq ={
      Id: item.Id,
      WhId: item.WhId,
      ItemId: item.ItemId,
      SupplierId: item.SupplierId,
      Remark: item.Remark,
      CreateBy:item.CreateBy,
      Qty:item.Qty,
      ReqStatus:item.ReqStatus,
      StoreTranTypeId:item.StoreTranTypeId,
      ReqUrgentType:item.ReqUrgentType,
      DeliveryTime:item.DeliveryTime
    };
    this.isList = false;
    this.searchItem();
  }


  // Pagination part Start
  //----------------------------------------------------------------------------
  //#region paging varible
  pageIndex: number = 0;
  pageSize: number = 10;
  rowCount: number = 0;
  listPageSize: any = [5, 10, 20];
  pageStart: number = 0;
  pageEnd: number = 0;
  totalRowsInList: number = 0;
  pagedItems: any = [];
  pager: {
    pages: any,
    totalPages: number
  } = {
      pages: [],
      totalPages: 0
    };
  //#endregion

  changePageSize() {
    this.pageIndex = 0;
    this.get();
  }
  changePageNumber(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.get();
  }

  // Pagination part End
  //----------------------------------------------------------------------
  // Start Common part


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

  oStoreReq:StoreReq={
    Id:0,
    WhId:0,
    ItemId:0,
    SupplierId:0,
    Qty:0,
    Remark:'',
    ReqStatus:1,
    CreateBy:0,
    StoreTranTypeId:1,
    ReqUrgentType:3,
    DeliveryTime:0
  };
  reset() {
    this.oStoreReq = {
      Id:0,
      WhId:0,
      ItemId:0,
      SupplierId:0,
      Qty:0,
      Remark:'',
      ReqStatus:1,
      CreateBy:0,
      StoreTranTypeId:1,
      ReqUrgentType:3,
      DeliveryTime:0
    };
    this.PartNo = '';
  }

  PartNo:string='';
  listItem:any = [];
  //value:string ='';
  searchItem():void {
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.httpClient.get(this.authService.baseURL + '/api/JobCard/GetItemByParts?value='+this.PartNo,{headers:oHttpHeaders}).subscribe((res)=>{
      this.listItem = res;
    });
  }

  selectItem(item:any):void {
    this.oStoreReq.ItemId = item.Id;
    this.PartNo = 'old:' + item.PartNoOld + ' new:' + item.PartNoNew;
  }
}

export interface StoreReq {
  Id:number
  WhId:number,
  ItemId:number,
  SupplierId:number,
  Qty:number,
  Remark:string,
  ReqStatus:number,
  CreateBy:number,
  StoreTranTypeId:number,
  ReqUrgentType:number,
  DeliveryTime:number
}
