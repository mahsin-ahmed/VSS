import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/services/common.service';

@Component({
  selector: 'app-sr',
  templateUrl: './sr.component.html',
  styleUrls: ['./sr.component.css']
})
export class SrComponent {
  constructor(private cs: CommonService, private httpClient: HttpClient) {
    this.get();
    this.getWareHouse();
    this.getItemName();  
    this.getSuplierName();
  }
  
  isList: boolean = true;
  baseUrl: string = 'http://localhost:56297';

  listWareHouse: any = [];
  listItem: any = [];
  listSupplier: any = [];
  StoreReqs: any = [];

  get() {
    this.httpClient.get(this.baseUrl + '/api/SR').subscribe((res) => {
      this.StoreReqs = res;
    });
  };

  getWareHouse(){
    this.httpClient.get(this.baseUrl + '/api/WareHouse/getWareHouse').subscribe((res)=>{
        this.listWareHouse = res;
    });
  }
  getItemName(){
    this.httpClient.get(this.baseUrl + '/api/Item/getItemName').subscribe((res)=>{
        this.listItem = res;
    });
  }

  getSuplierName(){
    this.httpClient.get(this.baseUrl + '/api/Client/getSuplierName').subscribe((res)=>{
        this.listSupplier = res;
    });
  }
  add() {
    this.httpClient.post(this.baseUrl + '/api/sr', this.StoreReq).subscribe((res)=>{
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
    this.httpClient.put(this.baseUrl + '/api/sr', this.StoreReq).subscribe((res)=>{
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
    this.httpClient.delete(this.baseUrl + '/api/sr/' + StoreReqs.Id).subscribe((res)=>{
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
  } = {
      Id: 0,
      WhId: 0,
      ItemId: 0,
      SupplierId: 0,
      PurPrice: 0,
      SalePrice: 0,
      Remark: '',
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
    };
  }

}
