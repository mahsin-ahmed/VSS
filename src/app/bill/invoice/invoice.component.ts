import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService, toastPayload } from '../../services/common.service';
import { IndividualConfig } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {
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
    public authService:AuthService,
    private datePipe: DatePipe) {
    this.get();
    this.getCompany();
    this.currentDate = this.datePipe.transform(this.currentDate, 'dd MMMM, yyyy');
  }

  //company: Array<Company>=[];
  /*getCompany(){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get<Company>(this.authService.baseURL + '/api/JobCard/GetCompany',{headers:oHttpHeaders}).subscribe((res)=>{
        this.VAT = res.Vat;
    });
  }*/

  get() {
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/Invoice?pi='+this.pageIndex+'&ps='+this.pageSize+'&jcStatus=1&IsPaid=false',{headers:oHttpHeaders}).subscribe((res)=>{
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

  createBill(item:any){
    this.isList = false;
    this.oBill.IsInvoice = item.IsInvoice;
    this.getFromJc(item.Id);
  }

  editBill(item:any){
    this.isList = false;
    this.getFromInvoice(item.Id);
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
  getFromJc(id:number):void{
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/JobCard/'+id,{headers:oHttpHeaders}).subscribe((res)=>{
      let item:any = res;
      this.JobCard ={
        Id:item.Id,
        JcId:item.JcId,
        MembershipNo:item.MembershipNo,
        JcNo:item.JcNo,
        JobDate:item.JobDate,
        CreateBy:item.CreateBy,
        Vin:item.Vin,
        Mileage:item.Mileage,
        EstiCostTotal:item.EstiCostTotal,
        EstiCostJob:item.EstiCostJob,
        EstiCostSpare:item.EstiCostSpare,
        ActualCostTotal:item.ActualCostTotal,
        ActualCostJob:item.ActualCostJob,
        ActualCostSpare:item.ActualCostSpare,
        ReceiveDate:item.ReceiveDate,
        ReceiveBy:item.ReceiveBy,
        JobStart:item.JobStart,
        JobEnd:item.JobEnd,
        Bay:item.Bay,
        VehicleNo:item.VehicleNo,
        Model:item.Model,
        JcStatus:item.JcStatus,
        ClientId:item.ClientId,
        ClientName:item.ClientName,
        ClientPhone:item.ClientPhone,
        ClientEmail:item.ClientEmail,
        ClientAddress:item.ClientAddress,
        ContactPerson:item.ContactPerson,
        ContactPersonNo:item.ContactPersonNo,
        Description:item.Description,
        JobDetails:item.JobDetails,
        JcSpares:item.JcSpares,
        Resources:item.Resources
      };
      this.addToBill();
    });
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
      //this.addToBill();
    });
  }

  JobCard : {
    // Job-Card
    Id:number,
    JcId:number,
    MembershipNo:string,
    JcNo:string,
    JobDate:string,
    CreateBy:number,
    Vin:string,
    Mileage:number,
    EstiCostTotal:number,
    EstiCostJob:number,
    EstiCostSpare:number,
    ActualCostTotal:number,
    ActualCostJob:number,
    ActualCostSpare:number,
    ReceiveDate:string,
    ReceiveBy:number,
    JobStart:string,
    JobEnd:string,
    Bay:number,
    VehicleNo:string,
    Model:string,
    JcStatus:number, // (CLOSE/OPEN)
    // Client
    ClientId:number,
    ClientName:string,
    ClientPhone:string,
    ClientEmail:string,
    ClientAddress:string,
    ContactPerson:string,
    ContactPersonNo:string,
    Description:string,
    // Job-Details, Spares, JcResource
    JobDetails:any,
    JcSpares:any,
    Resources:any
   } = {
    Id:0,
    JcId:0,
    MembershipNo:'',
    JcNo:'',
    JobDate:'',
    CreateBy:0,
    Vin:'',
    Mileage:0,
    EstiCostTotal:0,
    EstiCostJob:0,
    EstiCostSpare:0,
    ActualCostTotal:0,
    ActualCostJob:0,
    ActualCostSpare:0,
    ReceiveDate:'',
    ReceiveBy:0,
    JobStart:'',
    JobEnd:'',
    Bay:0,
    VehicleNo:'',
    Model:'',
    JcStatus:0,
    ClientId:0,
    ClientName:'',
    ClientPhone:'',
    ClientEmail:'',
    ClientAddress:'',
    ContactPerson:'',
    ContactPersonNo:'',
    Description:'',
    JobDetails:[],
    JcSpares:[],
    Resources:[]
   };

   Discount:number = 0;
   GrandTotal:number = 0;
   calculateTotals():void{
    this.GrandTotal = 0;
    for(var i = 0; i <this.listBillItem.length; i++) {
      var Price = this.listBillItem[i].UnitPrice == undefined ? 0 : this.listBillItem[i].UnitPrice;
      var Qty = this.listBillItem[i].Qty == undefined ? 0 : this.listBillItem[i].Qty;
      var discount:number = this.listBillItem[i].Discount == undefined ? 0 : this.listBillItem[i].Discount;
      var TotalPrice = Price * Qty;
      var DiscountAmountOnTotalPrice = TotalPrice * (discount/100);
      var TotalPriceAterDiscount:number = TotalPrice - DiscountAmountOnTotalPrice;
      var TotalVat:number=TotalPriceAterDiscount * (this.VAT/100);
      var TotalAmount:number=TotalPriceAterDiscount+TotalVat;
      this.listBillItem[i].TotalPrice = TotalPrice;
      this.listBillItem[i].DiscountAmount = DiscountAmountOnTotalPrice;
      this.listBillItem[i].TpAfterDiscount = TotalPriceAterDiscount;
      this.listBillItem[i].TotalVat = TotalVat;
      this.listBillItem[i].TotalAmount = TotalAmount;
      this.GrandTotal += TotalAmount;
    }
    this.oBill.GrandTotal = this.GrandTotal;
   }

   changeDiscount():void{
    for(var i = 0; i <this.listBillItem.length; i++) {
      this.listBillItem[i].Discount = this.Discount;
    }
    this.calculateTotals();
   }

   changeVat():void{
    for(var i = 0; i <this.listBillItem.length; i++) {
      this.listBillItem[i].TotalVat = this.VAT;
    }
    this.calculateTotals();
   }

   ItemTypes:any = [
    {ItemTypeId:1,ItemTypeName:'Job'},
    {ItemTypeId:2,ItemTypeName:'SP'}
  ];
   addToBill():void{
    //this.oBill.JcId = this.JobCard.JcId;
    this.oBill.JcId = this.JobCard.Id;
    this.oBill.ClientId = this.JobCard.ClientId;
    this.oBill.ClientName = this.JobCard.ClientName;
    this.oBill.ClientAddress = this.JobCard.ClientAddress;
    this.oBill.JcNo = this.JobCard.JcNo;
    this.listBillItem = [];
    this.GrandTotal = 0;
    for(var i = 0; i <this.JobCard.JobDetails.length; i++){
      var Price:number = this.JobCard.JobDetails[i].Price == undefined ? 0 :this.JobCard.JobDetails[i].Price;
      var discount:number = this.JobCard.JobDetails[i].Discount == undefined ? 0 :this.JobCard.JobDetails[i].Discount;
      var TotalPrice:number = Price * 1;
      var DiscountAmountOnTotalPrice: number = TotalPrice * (discount/100);
      var TotalPriceAterDiscount:number = TotalPrice - DiscountAmountOnTotalPrice;
      var TotalVat:number=TotalPriceAterDiscount * (this.VAT/100);
      var TotalAmount:number=TotalPriceAterDiscount+TotalVat;
      this.listBillItem.push({
        ItemId:this.JobCard.JobDetails[i].JobId,
        ItemType:1,
        ItemTypeName:'Job',
        ItemDescription:this.JobCard.JobDetails[i].JobName,
        Qty:1,
        UnitPrice:Price,
        TotalPrice:TotalPrice,
        Discount:discount,
        DiscountAmount:DiscountAmountOnTotalPrice,
        TpAfterDiscount:TotalPriceAterDiscount,
        Vat:this.VAT,
        TotalVat:TotalVat,
        TotalAmount:TotalAmount
      });
      this.GrandTotal += TotalAmount;
    }
    for(var i = 0; i <this.JobCard.JcSpares.length; i++) {
      var SalePrice = this.JobCard.JcSpares[i].SalePrice == undefined ? 0 : this.JobCard.JcSpares[i].SalePrice;
      var Quantity = this.JobCard.JcSpares[i].Quantity == undefined ? 0 : this.JobCard.JcSpares[i].Quantity;
      var discount:number = this.JobCard.JcSpares[i].Discount == undefined ? 0 : this.JobCard.JcSpares[i].Discount;
      var TotalPrice = SalePrice * Quantity;
      var DiscountAmountOnTotalPrice = TotalPrice * (discount/100);
      var TotalPriceAterDiscount:number = TotalPrice - DiscountAmountOnTotalPrice;
      var TotalVat:number=TotalPriceAterDiscount * (this.VAT/100);
      var TotalAmount:number=TotalPriceAterDiscount+TotalVat;
      this.listBillItem.push({
        ItemId:this.JobCard.JcSpares[i].ItemId,
        ItemType:2,
        ItemTypeName:'SP',
        ItemDescription:this.JobCard.JcSpares[i].ItemName,
        Qty:Quantity,
        UnitPrice:SalePrice,
        TotalPrice:TotalPrice,
        Discount:discount,
        DiscountAmount:DiscountAmountOnTotalPrice,
        TpAfterDiscount:TotalPriceAterDiscount,
        Vat:this.VAT,
        TotalVat:TotalVat,
        TotalAmount:TotalAmount
      });
      this.GrandTotal += TotalAmount;
    }
    this.oBill.GrandTotal = this.GrandTotal;
    this.oBill.InvoiceItems = this.listBillItem;
   }

   add(){
    this.oBill.InvoiceItems = this.listBillItem;
    if(this.oBill.InvoiceItems.length >0){
      const oHttpHeaders = new HttpHeaders(
        {
            'Token':this.authService.UserInfo.Token
        });
      this.oBill.CreateBy = this.authService.UserInfo.UserID;
      this.httpClient.post(this.authService.baseURL + '/api/Invoice', this.oBill,{headers:oHttpHeaders}).subscribe((res) => {
        if (res == true) {
          this.isList = true;
          this.get();
          //this.resetJob();
          //this.reset();
          this.showMessage('success', 'data added.');
        } else {
          this.showMessage('error', 'error occurred.');
        }
      });
    }
  }

  update(){
    this.oBill.InvoiceItems = this.listBillItem;
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.oBill.CreateBy = this.authService.UserInfo.UserID;
    this.httpClient.put(this.authService.baseURL + '/api/Invoice', this.oBill,{headers:oHttpHeaders}).subscribe((res) => {
      if (res == true) {
        this.isList = true;
        this.get();
        this.showMessage('success', 'data updated.');
      } else {
        this.showMessage('error', 'error occurred.');
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

  PayMethod:any=[
    {MethodId:1,Name:'Cash'},
    {MethodId:2,Name:'Bank Deposit'},
    {MethodId:3,Name:'Cheque'},
    {MethodId:4,Name:'bKash'},
    {MethodId:5,Name:'Nagad'},
    {MethodId:6,Name:'Upay'},
    {MethodId:7,Name:'Rocket'},
    {MethodId:8,Name:'mCash'},
    {MethodId:9,Name:'SureCash'},
    {MethodId:10,Name:'MyCash'},
    {MethodId:11,Name:'CellFin'},
    {MethodId:12,Name:'Others'}
  ]

  PayTran:{
    TrxId:string,
    Amount:number,
    Remarks:string,
    BusinessPartnerId:number
    PayMethodId:number,
    CreateBy:number
  }={
    TrxId:'',
    Amount:0,
    Remarks:'',
    BusinessPartnerId:0,
    PayMethodId:0,
    CreateBy:0
  }

  payment():void{
    this.PayTran.BusinessPartnerId = this.oBill.ClientId;
    this.PayTran.Amount = this.oBill.GrandTotal;
  }

  viewBill():void{
    this.PayTran.BusinessPartnerId = this.oBill.ClientId;
    this.PayTran.Amount = this.oBill.GrandTotal;
    this.openBill(this.oBill.JcId)
  }

  openBill(jcId:number) {
    this.getFromInvoicePrint(jcId);
  }

  currentDate:any = new Date();

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

  getFromInvoicePrint1(id:number):void{
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
        +'<td style="border:1px solid gray;">'+itemType+'</td>'
        +'<td style="border:1px solid gray;text-align: right;">'+this.listBillItem[i].Qty+'</td>'
        +'<td style="border:1px solid gray;text-align: right;">'+this.listBillItem[i].UnitPrice+'</td>'
        +'<td style="border:1px solid gray;text-align: right;">'+this.listBillItem[i].TotalPrice+'</td>'
        +'<td style="border:1px solid gray;text-align: right;'+showDiscount+'">'+this.listBillItem[i].Discount+'</td>'
        +'<td style="border:1px solid gray;text-align: right;'+showDiscount+'">'+this.listBillItem[i].TpAfterDiscount+'</td>'
        +'<td style="border:1px solid gray;text-align: right;'+showVat+'">'+this.listBillItem[i].TotalVat+'</td>'
        +'<td style="border:1px solid gray;text-align: right;">'+this.listBillItem[i].TotalAmount+'</td>'
        +'</tr>'
      }
      var oVat = this.listBillItem.filter((x:any)=>x.TotalVat > 0)[0];
      showVat = oVat == undefined ? 'display:none' : '';
      var oDiscount = this.listBillItem.filter((x:any)=>x.Discount > 0)[0];
      showDiscount = oDiscount == undefined ? 'display:none' : '';
      var Bill_Logo = location.origin + this.Bill_Logo;
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
                +'<strong>Job Card Number: </strong>'+this.oBill.JcNo
              +'</td>'
              +'</td>'
            +'</tr>'
            +'<tr>'
              +'<td>'
                +'<strong>Address: </strong>'+this.oBill.ClientAddress
              +'</td>'
              +'<td>'
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
            +'<th style="border:1px solid gray;text-align: right;'+showDiscount+'">Discount(%)</th>'
            +'<th style="border:1px solid gray;text-align: right;'+showDiscount+'">Total Price After Discount</th>'
            +'<th style="border:1px solid gray;text-align: right;'+showVat+'">Total VAT</th>'
            +'<th style="border:1px solid gray;text-align: right;">Total Amount</th>'
          +'</tr>'
          +htmlInvoice
          +'<tr>'
            +'<th></th>'
            +'<th></th>'
            +'<th></th>'
            +'<th></th>'
            +'<th></th>'
            +'<th style="text-align: right;'+showDiscount+'"></th>'
            +'<th style="text-align: right;'+showDiscount+'"></th>'
            +'<th style="text-align: right;'+showVat+'"></th>'
            +'<th style="text-align: right;">Grand Total: '+this.oBill.GrandTotal+'</th>'
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
            +'Payment'
            +'</table>'
            +'</div>';
        myWindow.document.write(htmlPrint);
      }
    });
  }

  validatePay():boolean{
    var isValid:boolean=true;
    if(this.PayTran.PayMethodId==0 || this.PayTran.PayMethodId == null || this.PayTran.PayMethodId == undefined){
      isValid = false;
      this.showMessage('warning', 'Payment mode is required.');
    }
    return isValid
  }

  pay():void{
    if(!this.validatePay()){
      return;
    }
    var isConfirm = confirm('Are sure to pay?');
    if(isConfirm){
      const oHttpHeaders = new HttpHeaders(
        {
            'Token':this.authService.UserInfo.Token
        });
      this.PayTran.CreateBy = this.authService.UserInfo.UserID;
      this.httpClient.post(this.authService.baseURL + '/api/Pay', this.PayTran,{headers:oHttpHeaders}).subscribe((res) => {
        if (res == true) {
          this.isList = true;
          this.get();
          this.showMessage('success', 'data added.');
        } else {
          this.showMessage('error', 'error occurred.');
        }
      });
    }
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
        this.VAT = this.company.Vat;
        var oLogo:any = this.company.Logos.filter((x:any)=>x.Name=='Bill Logo')[0];
        this.Bill_Logo = oLogo == undefined ? '':oLogo.LogoUrl;
        this.listBay = [];
        for(var i = 0; i < res.Bay; i++){
          this.listBay.push(i+1);
        }
    });
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