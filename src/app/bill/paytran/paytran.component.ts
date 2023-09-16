import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { CommonService, toastPayload } from '../../services/common.service';
import { IndividualConfig } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-paytran',
  templateUrl: './paytran.component.html',
  styleUrls: ['./paytran.component.css']
})
export class PaytranComponent {
  isList:boolean=true;
  listJobCard:any=[];
  //baseUrl:string='http://localhost:56297';
  //#region paging varible
  pageIndex: number = 0;
  pageSize:number = 5;
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
  toast!: toastPayload;

  constructor(private cs:CommonService,
    private httpClient: HttpClient,
    private authService:AuthService) {
    this.get();
  }

  switchView(view: string): void {
    if (view == 'form') {
      this.isList = false;
    } else {
      this.isList = true;
      //this.reset();
    }
  }

  get(){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/Invoice?pi='+this.pageIndex+'&ps='+this.pageSize+'&jcStatus=1&isPaid=true',{headers:oHttpHeaders}).subscribe((res)=>{
      this.listJobCard = res;
      //#region paging
      this.rowCount = this.listJobCard.length > 0 ? this.listJobCard[0].RowCount : 0;
      this.totalRowsInList = this.listJobCard.length;
      this.pager.totalPages = Math.ceil(this.rowCount / this.pageSize);
      this.pager.pages = [];
      for(var i = 0; i<this.pager.totalPages; i++){
        this.pager.pages.push(i+1);
      }
      this.pageStart = (this.pageIndex * this.pageSize) + 1;
      this.pageEnd = (this.pageStart - 1) + this.totalRowsInList;
      //#endregion
    });
  }

  detailBill(item:any){
    this.isList = false;
    this.getFromInvoice(item.Id);
  }

  getFromInvoice(id:number):void{
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.httpClient.get(this.authService.baseURL + '/api/Invoice/GetByJc?jcId='+id,{headers:oHttpHeaders}).subscribe((res)=>{
      let item:any = res;
      this.oBill = item;
      this.listBillItem = this.oBill.InvoiceItems;
    });
  }

  VAT:number=10;
  oBill:{
    Id:number,
    ClientId:number,
    CreateDate:string,
    CreateBy:number,
    IsPaid:boolean,
    JcId:number,
    ClientName:string,
    JcNo:string,
    GrandTotal:number,
    InvoiceItems:any,
    IsInvoice:number,
    BalanceAmount:number,
    PaySettles:any
  }={
    Id:0,
    ClientId:0,
    CreateDate:'',
    CreateBy:0,
    IsPaid:false,
    JcId:0,
    ClientName:'',
    JcNo:'',
    GrandTotal:0,
    InvoiceItems:[],
    IsInvoice:0,
    BalanceAmount:0,
    PaySettles:[]
  };
  listBillItem:any =[];

}
