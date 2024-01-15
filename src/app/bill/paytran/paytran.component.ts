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
    public authService:AuthService) {
    this.get();
    this.getCompany();
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
      if(res){
        this.listJobCard = res;
      }else{
        this.showMessage('warning', 'Session expired, please login.');
      }
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

  getFromInvoicePrint(id:number):void{
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.httpClient.get(this.authService.baseURL + '/api/Invoice/GetByJc?jcId='+id,{headers:oHttpHeaders}).subscribe((res)=>{
      let item:any = res;
      this.oBill = item;
      this.listBillItem = this.oBill.InvoiceItems;
      ////
      var htmlInvoice ='';
      for(var i = 0; i < this.listBillItem.length; i++){
        var sl = i + 1;
        var itemType = this.listBillItem[i].ItemType == 1 ? 'Job':this.listBillItem[i].ItemType == 2?'SP':'N/A';
        htmlInvoice+='<tr style="border:1px solid gray">'
        +'<td style="border:1px solid gray;">'+sl+'</td>'
        +'<td style="border:1px solid gray;">'+itemType+'</td>'
        +'<td style="border:1px solid gray;text-align: right;">'+this.listBillItem[i].Qty+'</td>'
        +'<td style="border:1px solid gray;text-align: right;">'+this.listBillItem[i].UnitPrice+'</td>'
        +'<td style="border:1px solid gray;text-align: right;">'+this.listBillItem[i].TotalPrice+'</td>'
        +'<td style="border:1px solid gray;text-align: right;">'+this.listBillItem[i].Discount+'</td>'
        +'<td style="border:1px solid gray;text-align: right;">'+this.listBillItem[i].TpAfterDiscount+'</td>'
        +'<td style="border:1px solid gray;text-align: right;">'+this.listBillItem[i].TotalVat+'</td>'
        +'<td style="border:1px solid gray;text-align: right;">'+this.listBillItem[i].TotalAmount+'</td>'
        +'</tr>'
      }
      var htmlPayment = '';
      for(var i = 0; i < this.oBill.PaySettles.length; i++) {
        var sl = i + 1;
        var PayDate = this.oBill.PaySettles[i].PayDate.substr(0,16);
        htmlPayment+='<tr style="border:1px solid gray">'
            +'<td style="border:1px solid gray">'+sl+'</td>'
            +'<td style="border:1px solid gray">'+this.oBill.PaySettles[i].PayMethodName+'</td>'
            +'<td style="border:1px solid gray">'+PayDate+'</td>'
            +'<td style="border:1px solid gray;text-align: right;">'+this.oBill.PaySettles[i].Amount+'</td>'
            +'</tr>'
      }
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
                +'<div style="text-align:center;font-size:larger">'
                +'<strong style="color:red">'+this.company.CompanyName+'</strong>'
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
          +'<h3 style="text-align:center">Bill Copy</h3>'
          +'<table style="width:100%;border-collapse: collapse;">'
            +'<tr>'
              +'<td>'
                +'<strong>Client Name: </strong>'+this.oBill.ClientName
              +'</td>'
              +'<td>'
              +'<strong>Invoice No: </strong>'+this.oBill.Id
              +'</td>'
            +'</tr>'
            +'<tr>'
            +'<td>'
              +'<strong>Membership No.: </strong>'+this.oBill.MembershipNo
            +'</td>'
              +'<td>'
                +'<strong>JC No.: </strong>'+this.oBill.JcNo
              +'</td>'
            +'</tr>'
            +'<tr>'
              +'<td>'
                +'<strong>Phone: </strong>'+this.oBill.ClientPhone
              +'</td>'
              +'<td>'
              +'<strong>Balance: </strong>'+this.oBill.BalanceAmount
              +'</td>'
            +'</tr>'
            +'<tr>'
              +'<td>'
                +'<strong>Email: </strong>'+this.oBill.ClientEmail
              +'</td>'
              +'<td>'
              +'<strong>Car Reg.: </strong>'+this.oBill.VehicleNo
              +'</td>'
            +'</tr>'
            +'<tr>'
              +'<td>'
              +'<strong>Address: </strong>'+this.oBill.ClientAddress
              +'</td>'
              +'<td>'
              +'<strong>Vin: </strong>'+this.oBill.Vin
              +'</td>'
            +'</tr>'
            +'<tr>'
              +'<td>'
              +'<strong>Driver: </strong>'+this.oBill.ContactPerson
              +'</td>'
              +'<td>'
              +'<strong>Driver Contact: </strong>'+this.oBill.ContactPersonNo
              +'</td>'
            +'</tr>'
          +'</table>'
          +'<h4>Bill Items</h4>'
          +'<table style="width:100%;border-collapse: collapse;">'
          +'<tr style="border:1px solid gray">'
            +'<th style="border:1px solid gray">#</th>'
            +'<th style="border:1px solid gray">Item Type</th>'
            +'<th style="border:1px solid gray;text-align: right;">Qty</th>'
            +'<th style="border:1px solid gray;text-align: right;">Price</th>'
            +'<th style="border:1px solid gray;text-align: right;">Total Price</th>'
            +'<th style="border:1px solid gray;text-align: right;">Discount(%)</th>'
            +'<th style="border:1px solid gray;text-align: right;">Total Price After Discount</th>'
            +'<th style="border:1px solid gray;text-align: right;">Total VAT ('+this.VAT+'%)</th>'
            +'<th style="border:1px solid gray;text-align: right;">Total Amount</th>'
          +'</tr>'
          +htmlInvoice
          +'<tr>'
            +'<td colspan="7">In word: '+this.oBill.GrandTotalWord+'</td>'
            +'<th style="text-align: right;">Grand Total:</th>'
            +'<th style="text-align: right;">'+this.oBill.GrandTotal+'</th>'
          +'</tr>'
          +'</table>'
          +'<h4>Payment Information</h4>'
          +'<table style="width:100%;border-collapse: collapse;">'
            +'<tr style="border:1px solid gray">'
              +'<th style="border:1px solid gray">#</th>'
              +'<th style="border:1px solid gray">Pay Method</th>'
              +'<th style="border:1px solid gray">Pay Date</th>'
              +'<th style="border:1px solid gray;text-align: right;">Amount</th>'
            +'</tr>'
            +htmlPayment
            +'</table>'
            +'<br>'
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