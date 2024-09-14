import { Component } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { CommonService, toastPayload } from '../../services/common.service';
import { IndividualConfig } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-paytran',
  templateUrl: './paytran.component.html',
  styleUrls: ['./paytran.component.css']
})
export class PaytranComponent {
  isList:boolean=true;
  listJobCard:any=[];
  //baseUrl:string='http://localhost:56297';

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

  toast!: toastPayload;

  currentDate:any = new Date();

  constructor(private cs:CommonService,
    private httpClient: HttpClient,
    public authService:AuthService,
    private datePipe: DatePipe) {
    this.get();
    this.getCompany();
    this.currentDate = this.datePipe.transform(this.currentDate, 'dd MMMM, yyyy');
  }

  switchView(view: string): void {
    if (view == 'form') {
      this.isList = false;
    } else {
      this.isList = true;
      //this.reset();
    }
  }

  //this.authService.baseURL + '/api/JobCard?pi='+this.pageIndex+'&ps='+this.pageSize+'&jcStatus='+this.jcStatus+'&jcNo='+this.jcNo+'&startDate='+this.startDate+'&endDate='+this.endDate
  get():void{
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/Invoice?pi='+this.pageIndex+'&ps='+this.pageSize+'&jcStatus='+this.jcStatus+'&jcNo='+this.jcNo+'&startDate='+this.startDate+'&endDate='+this.endDate+'&isPaid=true',{headers:oHttpHeaders}).subscribe((res)=>{
      if(res){
        this.listJobCard = res;
        //#region Pagination 2
        this.rowCount = this.listJobCard.length > 0 ? this.listJobCard[0].RowCount : 0;
        this.totalRowsInList = this.listJobCard.length;
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

  getFromInvoicePrint(id:number):void{
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.httpClient.get(this.authService.baseURL + '/api/Invoice/GetByJc?jcId='+id,{headers:oHttpHeaders}).subscribe((res)=>{
      let item:any = res;
      this.oBill = item;
      this.listBillItem = this.oBill.InvoiceItems;
      var htmlInvoice ='';
      var showVat = '';
      var showDiscount = '';
      for(var i = 0; i < this.listBillItem.length; i++){
        showVat = this.listBillItem[i].TotalVat > 0 ? '' : 'display:none';
        showDiscount = this.listBillItem[i].Discount > 0 ? '' : 'display:none';
        var sl = i + 1;
        var itemType = this.listBillItem[i].ItemType == 1 ? 'Job':this.listBillItem[i].ItemType == 2?'SP':'N/A';
        htmlInvoice+='<tr style="border:1px solid gray">'
        +'<td style="border:1px solid gray;">'+sl+'</td>'
        +'<td style="border:1px solid gray;">'+this.listBillItem[i].ItemName+' ('+itemType+')</td>'
        +'<td style="border:1px solid gray;text-align: right;">'+this.listBillItem[i].Qty+'</td>'
        +'<td style="border:1px solid gray;text-align: right;">'+this.listBillItem[i].UnitPrice+'.00</td>'
        +'<td style="border:1px solid gray;text-align: right;">'+this.listBillItem[i].TotalPrice+'.00</td>'
        +'<td style="border:1px solid gray;text-align: right;'+showDiscount+'">'+this.listBillItem[i].Discount+'</td>'
        +'<td style="border:1px solid gray;text-align: right;'+showDiscount+'">'+this.listBillItem[i].TpAfterDiscount+'</td>'
        +'<td style="border:1px solid gray;text-align: right;'+showVat+'">'+this.listBillItem[i].TotalVat+'</td>'
        +'<td style="border:1px solid gray;text-align: right;">'+this.listBillItem[i].TotalAmount+'.00</td>'
        +'</tr>'
      }
      var oVat = this.listBillItem.filter((x:any)=>x.TotalVat > 0)[0];
      showVat = oVat == undefined ? 'display:none' : '';
      var oDiscount = this.listBillItem.filter((x:any)=>x.Discount > 0)[0];
      showDiscount = oDiscount == undefined ? 'display:none' : '';
      var colspan = 4;
      colspan += oVat == undefined ? 0 : 1;
      colspan += oDiscount == undefined ? 0 : 2;
      var htmlPayment = '';
      for(var i = 0; i < this.oBill.PaySettles.length; i++) {
        var sl = i + 1;
        var PayDate = this.oBill.PaySettles[i].PayDate.substr(0,16);
        htmlPayment+='<tr style="border:1px solid gray">'
            +'<td style="border:1px solid gray">'+sl+'</td>'
            +'<td style="border:1px solid gray">'+this.oBill.PaySettles[i].PayMethodName+'</td>'
            +'<td style="border:1px solid gray">'+PayDate+'</td>'
            +'<td style="border:1px solid gray;text-align: right;">'+this.oBill.PaySettles[i].Amount+'.00</td>'
            +'</tr>'
      }
      var strMileage = this.oBill.Mileage > 0 ? this.oBill.Mileage.toString() : '';
      //var Bill_Logo = location.origin + this.Bill_Logo;
      var Bill_Logo = this.Bill_Logo;
      const myWindow: Window | null = window.open("", "", "width=793,height=1123");
      if(myWindow !=undefined) {
        var htmlPrint = '<!DOCTYPE html><html lang="en"><head><title>Bill-Copy</title></head><body>'
        +'<div style="margin-left:12px;margin-right:12px;margin-bottom:12px;margin-top:12px;">' 
          +'<table style="width:100%;border-collapse: collapse;">'
            +'<tr>'
              +'<td style="width:25%"><img style="width:180px" title="company_logo" style="width:102px" src="'+Bill_Logo+'" /></td>'
              +'<td style="width:50%">'
                +'<div style="text-align:center">'
                +'<strong style="color:black;font-size:40px">'+this.company.CompanyName+'</strong>'
                +'</div>'
                +'<div style="text-align:center">'
                +this.company.Address
                +'<br/>('+this.company.Description+')'
                +'</div>'  
                +'<div style="text-align:center">Phone: '+this.company.Phone+'</div>'
                +'<div style="text-align:center">Email: '+this.company.Email+'</div>'
                +'<div style="text-align:center">Website: '+this.company.Website+'</div>'  
              +'</td>'
              +'<td style="width:25%"></td>'
            +'</tr>'
          +'</table>'
          +'<div>'
          +'<h2 style="text-align:center"><u>Bill Copy</u></h2>'
          +'<table style="width:100%;border-collapse: collapse;">'
            +'<tr>'
              +'<td>'+'<strong>Client Name: </strong>'+this.oBill.ClientName+'</td>'
              +'<td>'+'<strong>Invoice No: </strong>'+this.oBill.Id+'</td>'
            +'</tr>'
            +'<tr>'
            +'<td>'+'<strong>Membership No.: </strong>'+this.oBill.MembershipNo+'</td>'
              +'<td>'+'<strong>JC No.: </strong>'+this.oBill.JcNo+'</td>'
            +'</tr>'
            +'<tr>'
              +'<td>'
                +'<strong>Phone: </strong>'+this.oBill.ClientPhone
              +'</td>'
              +'<td>'+'<strong>Chassis/VIN: </strong>'+this.oBill.Vin+'</td>'
              // +'<td>'+'<strong>Balance: </strong>'+this.oBill.BalanceAmount+'</td>'
            +'</tr>'
            +'<tr>'
              +'<td>'+'<strong>Email: </strong>'+this.oBill.ClientEmail+'</td>'
              +'<td>'+'<strong>Car Reg.: </strong>'+this.oBill.VehicleNo+'</td>'
            +'</tr>'
            +'<tr>'
              +'<td>'+'<strong>Address: </strong>'+this.oBill.ClientAddress+'</td>'
              +'<td>'+'<strong>Model: </strong>'+this.oBill.Model+'</td>'
            +'</tr>'
            +'<tr>'
              +'<td>'+'<strong>Driver: </strong>'+this.oBill.ContactPerson+'</td>'
              +'<td>'+'<strong>Sub-Model: </strong>'+this.oBill.SubModel+'</td>'
            +'</tr>'
            +'<tr>'
              +'<td>'+'<strong>Driver Contact: </strong>'+this.oBill.ContactPersonNo+'</td>'
              +'<td>'+'<strong>Mileage(km): </strong>'+strMileage+'</td>'
            +'</tr>'
          +'</table>'
          +'<br/><div><table style="width:100%"><tr><td style="text-align:left;font-weight:bolder">Bill Items:</td><td style="text-align:right"><b>Billing Date: </b>'+this.currentDate+'</td></tr></table></div>'
          +'<table style="width:100%;border-collapse: collapse;">'
          +'<tr style="border:1px solid gray">'
            +'<th style="border:1px solid gray">#</th>'
            +'<th style="border:1px solid gray">Item</th>'
            +'<th style="border:1px solid gray;text-align: right;">Qty</th>'
            +'<th style="border:1px solid gray;text-align: right;">Price</th>'
            +'<th style="border:1px solid gray;text-align: right;">Total Price</th>'
            +'<th style="border:1px solid gray;text-align: right;'+showDiscount+'">Discount(%)</th>'
            +'<th style="border:1px solid gray;text-align: right;'+showDiscount+'">Total Price After Discount</th>'
            +'<th style="border:1px solid gray;text-align: right;'+showVat+'">Total VAT</th>'
            +'<th style="border:1px solid gray;text-align: right;">Total Amount</th>'
          +'</tr>'
          +htmlInvoice
          +'<tr>'
          +'<td colspan="'+colspan+'">In word: <strong>'+this.oBill.GrandTotalWord+'</strong></td>'
            +'<th style="text-align: right;">Grand Total:</th>'
            +'<th style="text-align: right;">'+this.oBill.GrandTotal+'.00</th>'
          +'</tr>'
          +'</table>'
          +'<br /><div style="font-weight:bolder">Payment Information</div>'
          +'<table style="width:100%;border-collapse: collapse;">'
            +'<tr style="border:1px solid gray">'
              +'<th style="border:1px solid gray">#</th>'
              +'<th style="border:1px solid gray">Pay Method</th>'
              +'<th style="border:1px solid gray">Pay Date</th>'
              +'<th style="border:1px solid gray;text-align: right;">Amount</th>'
            +'</tr>'
            +htmlPayment
            +'</table>'
            +'<br /><br /><br /><br />'
            +'<table style="width:100%">'
            +'<tr>'
              +'<td>Customer Signature<br/>Name:....................</td>'
              +'<td>Floor Supervisor<br/>Name:....................</td>'
              +'<td>Service Advisor Signature<br/>Name:....................</td>'
            +'</tr>'
          +'</table>'  
            +'</div>';
        myWindow.document.write(htmlPrint);
      }
    });
  }

  VAT:number=10;
  oBill:{
    Id:number,
    ClientId:number,
    ClientName:string,
    ClientMobile:string,
    ClientAddress:string,
    MembershipNo:string,
    CreateDate:string,
    CreateBy:number,
    IsPaid:boolean,
    JcId:number,
    JcNo:string,
    GrandTotal:number,
    GrandTotalWord:string
    InvoiceItems:any,
    IsInvoice:number,
    BalanceAmount:number,
    PaySettles:any,
    ClientPhone:string,
    ClientEmail:string,
    VehicleNo:string,
    Vin:string,
    ContactPerson:string,
    ContactPersonNo:string,
    ItemName:string,
    Model:string,
    SubModel:string,
    Mileage:number
  }={
    Id:0,
    ClientId:0,
    ClientName:'',
    ClientMobile:'',
    ClientAddress:'',
    MembershipNo:'',
    CreateDate:'',
    CreateBy:0,
    IsPaid:false,
    JcId:0,
    JcNo:'',
    GrandTotal:0,
    GrandTotalWord:'',
    InvoiceItems:[],
    IsInvoice:0,
    BalanceAmount:0,
    PaySettles:[],
    ClientPhone:'',
    ClientEmail:'',
    VehicleNo:'',
    Vin:'',
    ContactPerson:'',
    ContactPersonNo:'',
    ItemName:'',
    Model:'',
    SubModel:'',
    Mileage:0
  };
  listBillItem:any =[];

  openWin(item:any) {
    this.getFromInvoicePrint(item.Id);
  }

  listBay:any = [];
  company:Company = {CompanyId:0,
    CompanyCode:'',
    CompanyName:'',
    Description:'',
    DateFormat:'',
    DecimalPlace:0,
    Bay:0,
    Vat:0,
    Address:'',
    Phone:'',
    Email:'',
    Website:'',
    IsActive:false,
    Logos:[]
  };
  Bill_Logo:string='';
  getCompany(){
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.httpClient.get<Company>(this.authService.baseURL + '/api/JobCard/GetCompany',{headers:oHttpHeaders}).subscribe((res)=>{
        this.company = res;
        var oLogo:any = this.company.Logos.filter((x:any)=>x.Name=='Bill Logo')[0];
        this.Bill_Logo = oLogo == undefined ? '':oLogo.LogoUrl;
        this.listBay = [];
        for(var i = 0; i < res.Bay; i++){
          this.listBay.push(i+1);
        }
    });
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

  listJcStatusFitler:any=[{Id:0, Name:'All'},{Id:1,Name:'Close'},{Id:2,Name:'Open'}];
  jcStatus:number = 0;
  jcNo:string='';
  startDate:string='';
  endDate:string='';

}

export interface Company{
  CompanyId:number,
  CompanyCode:string,
  CompanyName:string,
  Description:string,
  DateFormat:string,
  DecimalPlace:number,
  Bay:number,
  Vat:number,
  Address:string,
  Phone:string,
  Email:string,
  Website:string,
  IsActive:boolean,
  Logos:[]
}
