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
  }

  Item: {
    Id:number,
    ItemCode:string,
    ItemName:string,
    BrandId:number,
    PartNoOld:string,
    PartNoNew:string, 
    Remarks:string,  
  }={
    Id:0,
    ItemCode:'',
    ItemName:'',
    BrandId:0,
    PartNoOld:'',
    PartNoNew:'',
    Remarks:'',
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

  addItem() {
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.post(this.authService.baseURL + '/api/Item', this.Item,{headers: oHttpHeaders}).subscribe((res) => {
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
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.put(this.authService.baseURL + '/api/Item', this.Item,{headers: oHttpHeaders}).subscribe((res) => {
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

  editJob(item: any) {
    this.Item = {
      Id: item.Id,
      ItemCode: item.ItemCode,
      ItemName: item.ItemName,
      BrandId: item.BrandId,
      PartNoOld: item.PartNoOld,
      PartNoNew: item.PartNoNew,
      Remarks: item.Remarks,
    };
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
    this.Item = {
      Id:0,
      ItemCode:'',
      ItemName:'',
      BrandId:0,
      PartNoOld:'',
      PartNoNew:'',
      Remarks:'',
    };
  }
}
