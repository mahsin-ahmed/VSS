import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/services/common.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-store-req',
  templateUrl: './storereq.component.html',
  styleUrls: ['./storereq.component.css']
})
export class StorereqComponent {
  constructor(private cs: CommonService, 
    private httpClient: HttpClient,
    private authService:AuthService) {
    this.get();
    this.getWareHouse();
    this.getItemName();  
    this.getSuplierName();
  }
  
  isList: boolean = true;
  //baseUrl: string = 'http://localhost:56297';

  listWareHouse: any = [];
  listItem: any = [];
  listSupplier: any = [];
  StoreReqs: any = [];

  get() {
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });  
    this.httpClient.get(this.authService.baseURL + '/api/SR?pi='+this.pageIndex+'&ps='+this.pageSize,{headers: oHttpHeaders}).subscribe((res) => {
      this.StoreReqs = res;
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
  getItemName(){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/Item/getItemName',{headers: oHttpHeaders}).subscribe((res)=>{
        this.listItem = res;
    });
  }

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
    if(this.StoreReq.WhId==undefined||this.StoreReq.WhId==null||this.StoreReq.WhId==0){
      isValid = false;
      this.showMessage('warning', 'Item Name is required.');
    }
    if(this.StoreReq.ItemId==undefined||this.StoreReq.ItemId==null||this.StoreReq.ItemId==0){
      isValid = false;
      this.showMessage('warning', 'Item is required.');
    }
    if(this.StoreReq.SupplierId==undefined||this.StoreReq.SupplierId==null||this.StoreReq.SupplierId==0){
      isValid = false;
      this.showMessage('warning', 'Supplier is required.');
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
      this.StoreReq.CreateBy = this.authService.UserInfo.UserID;
    this.httpClient.post(this.authService.baseURL + '/api/sr', this.StoreReq,{headers: oHttpHeaders}).subscribe((res)=>{
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
    this.StoreReq.CreateBy = this.authService.UserInfo.UserID;
    this.httpClient.put(this.authService.baseURL + '/api/sr', this.StoreReq,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res == true){
        this.isList = true;
        this.get();
        this.showMessage('success', 'data updated.');
      }else{
        this.showMessage('error', 'error occurred.');
      }
  });
   }
  remove(StoreReqs: any) {
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.delete(this.authService.baseURL + '/api/sr/' + StoreReqs.Id,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res == true){
        this.get();
        this.showMessage('success', 'data removed.');
      }else{
        this.showMessage('error', 'error occurred.');
      }
    }); 
   }

  StoreReq: {
    Id: number,
    WhId: number,
    ItemId: number,
    SupplierId: number,
    PurPrice: number,
    SalePrice: number,
    Remark: string,
    CreateBy:number
  } = {
      Id: 0,
      WhId: 0,
      ItemId: 0,
      SupplierId: 0,
      PurPrice: 0,
      SalePrice: 0,
      Remark: '',
      CreateBy:0
    }

  editStoreReq(item: any) {
    this.StoreReq = {
      Id: item.Id,
      WhId: item.WhId,
      ItemId: item.ItemId,
      SupplierId: item.SupplierId,
      PurPrice: item.PurPrice,
      SalePrice: item.SalePrice,
      Remark: item.Remark,
      CreateBy:item.CreateBy
    };
    this.isList = false;
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

  reset() {
    this.StoreReq = {
      Id: 0,
      WhId: 0,
      ItemId: 0,
      SupplierId: 0,
      PurPrice: 0,
      SalePrice: 0,
      Remark: '',
      CreateBy:0
    };
  }

}
