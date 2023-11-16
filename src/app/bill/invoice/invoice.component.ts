import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonService, toastPayload } from '../../services/common.service';
import { IndividualConfig } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';

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
    public authService:AuthService) {
    this.get();
    this.getCompany();
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

  openWin() {
    const myWindow: Window | null = window.open("", "", "width=793,height=1123");
    if(myWindow !=undefined){
      
var jcForTem = '<!DOCTYPE html><html lang="en"><head><title>Bill Copy</title></head><body>'
  +'<div style="margin-left:12px;margin-right:12px;margin-bottom:12px;margin-top:12px;">' 
    +'<table style="width:100%;border-collapse: collapse;">'
      +'<tr>'
        +'<td style="width:25%"><img style="width:180px" title="company_logo" style="width:102px" src="https://xeonstorage.blob.core.windows.net/dynamic-site-data/vslogo.png" /></td>'
        +'<td style="width:50%">'
          +'<div style="text-align:center;font-size:larger">'
          +'<strong>Vehicle Solution</strong>'
          +'</div>'  
          +'<div style="text-align:center">'
          +'541-42, Ferajitola, Solmaith, Vatara, Dhaka-1212<br/>(Nearby Evercare hospital, Bashundhara R/A)'
          +'</div>'  
          +'<div style="text-align:center">'
          +'Phone: 01755660906'
          +'</div>'
          +'<div style="text-align:center">'
          +'Email: vehiclesolutionbd@gmail.com'
          +'</div>'
          +'<div style="text-align:center">'
          +'Website: www.vehiclesolution.net'
          +'</div>'  
        +'</td>'
        +'<td style="width:25%"></td>'
      +'</tr>'
    +'</table>'
    +'<table style="width:100%;border-collapse: collapse;">'
      +'<tr>'
        +'<th style="border:1px solid gray">JC No: 1553</th>'
        +'<th style="border:1px solid gray">Job Date: 23/08/22</th>'
        +'<th style="border:1px solid gray">Created: Mr. Ali</th>'
        +'<th style="border:1px solid gray">JC Last Status:</th>'
      +'</tr>'
    +'</table>'
    +'<table style="width:100%;border-collapse: collapse">'
      +'<tr>'
        +'<td style="border:1px solid gray">'
          +'<table style="width:100%;height:100%;border-collapse: collapse">'
            +'<tr style="border:1px solid gray">'+'<td>Owner Name: Somorita Hospital</td>'+'</tr>'
            +'<tr style="border:1px solid gray">'+'<td>Contact Person: Mr. Sumon Mia</td>'+'</tr>'
            +'<tr style="border:1px solid gray">'+'<td>Cont Person No.: </td>'+'</tr>'
            +'<tr style="border:1px solid gray">'+'<td>Membership ID: </td>'+'</tr>'
            +'<tr style="border:1px solid gray">'+'<td>Address: </td>'+'</tr>'
            +'<tr style="border:1px solid gray">'
              +'<td>'
                +'<table style="width:100%;border-collapse: collapse">'
                    +'<tr>'
                      +'<th style="border:1px solid gray" align="left">#</th>'
                      +'<th style="border:1px solid gray" align="left">Time</th>'
                      +'<th style="border:1px solid gray" align="left">Signature</th>'
                    +'</tr>'
                    +'<tr>'
                      +'<td style="border:1px solid gray" align="left">Receive Time:</td>'
                      +'<td style="border:1px solid gray" align="left"></td>'
                      +'<td style="border:1px solid gray" align="left"></td>'
                    +'</tr>'
                    +'<tr>'
                      +'<td style="border:1px solid gray" align="left">JC Started:</td>'
                      +'<td style="border:1px solid gray" align="left"></td>'
                      +'<td style="border:1px solid gray" align="left"></td>'
                    +'</tr>'
                    +'<tr>'
                      +'<td style="border:1px solid gray" align="left">JC Completed:</td>'
                      +'<td style="border:1px solid gray" align="left"></td>'
                      +'<td style="border:1px solid gray" align="left"></td>'
                    +'</tr>'
                +'</table>'
              +'</td>'
            +'</tr>'
          +'</table>'
        +'</td>'
        +'<td style="border:1px solid gray">'
          +'<table style="width:100%;border-collapse: collapse">'
            +'<tr style="border:1px solid gray">'+'<td>Vehicle Reg.: DM-GA-22-1632</td>'+'</tr>'
            +'<tr style="border:1px solid gray">'+'<td>Model: LPK23/25/00</td>'+'</tr>'
            +'<tr style="border:1px solid gray">'+'<td>VIN/Frame: </td>'+'</tr>'
            +'<tr style="border:1px solid gray">'+'<td>Mileage: </td>'+'</tr>'
            +'<tr style="border:1px solid gray">'+'<td>Mechanic Name: </td>'+'</tr>'
            +'<tr style="border:1px solid gray">'+'<td>Estimated Time: </td>'+'</tr>'
            +'<tr>'
              +'<td>'
                +'<table style="width:100%;border-collapse: collapse;">'
                    +'<tr style="border:1px solid gray">'
                      +'<th align="left">Cost</th>'
                      +'<th align="right">Labour</th>'
                      +'<th align="right">Spare Parts</th>'
                      +'<th align="right">Total</th>'
                    +'</tr>'
                    +'<tr style="border:1px solid gray">'
                      +'<td align="left">Estimated</td>'
                      +'<td align="right">12000</td>'
                      +'<td align="right">45000</td>'
                      +'<td align="right">57000</td>'
                    +'</tr>'
                    +'<tr style="border:1px solid gray">'
                      +'<td align="left">Actual</td>'
                      +'<td align="right"></td>'
                      +'<td align="right"></td>'
                      +'<td align="right"></td>'
                    +'</tr>'
                +'</table>'
              +'</td>'
            +'</tr>'
          +'</table>'
        +'</td>'
      +'</tr>'
    +'</table>'
    +'<div style="min-height:12px"></div>'
    +'<table style="width:100%;border-collapse: collapse;">'
      +'<tr style="border:1px solid gray">'
        +'<th align="left" style="border:1px solid gray">SL No.</th>'
        +'<th style="border:1px solid gray">Job Description</th>'
        +'<th style="border:1px solid gray">Working Instruction</th>'
        +'<th style="border:1px solid gray">Action Taken</th>'
        +'<th align="right" style="border:1px solid gray">Bill</th>'
      +'</tr>'
      +'<tr style="border:1px solid gray">'
        +'<td style="border:1px solid gray">1</td>'
        +'<td style="border:1px solid gray"></td>'
        +'<td style="border:1px solid gray"></td>'
        +'<td style="border:1px solid gray"></td>'
        +'<td style="border:1px solid gray"></td>'
      +'</tr>'
      +'<tr style="border:1px solid gray">'
        +'<td style="border:1px solid gray">2</td>'
        +'<td style="border:1px solid gray"></td>'
        +'<td style="border:1px solid gray"></td>'
        +'<td style="border:1px solid gray"></td>'
        +'<td style="border:1px solid gray"></td>'
      +'</tr>'
      +'<tr style="border:1px solid gray">'
        +'<td style="border:1px solid gray">3</td>'
        +'<td style="border:1px solid gray"></td>'
        +'<td style="border:1px solid gray"></td>'
        +'<td style="border:1px solid gray"></td>'
        +'<td style="border:1px solid gray"></td>'
      +'</tr>'
    +'</table>'
    +'<div style="min-height:12px"></div>'
    +'<table style="width:100%;border-collapse: collapse;">'
      +'<tr style="border:1px solid gray">'
        +'<th align="left" style="border:1px solid gray">SL No.</th>'
        +'<th style="border:1px solid gray">Item</th>'
        +'<th style="border:1px solid gray">Brand</th>'
        +'<th align="right" style="border:1px solid gray">Price</th>'
        +'<th align="right" style="border:1px solid gray">Quantity</th>'
        +'<th align="right" style="border:1px solid gray">Amount</th>'
        +'<th align="right" style="border:1px solid gray">Status</th>'
      +'</tr>'
      +'<tr style="border:1px solid gray">'
        +'<td style="border:1px solid gray">1</td>'
        +'<td style="border:1px solid gray">Relay-420</td>'
        +'<td style="border:1px solid gray">Suzuki</td>'
        +'<td style="border:1px solid gray">350</td>'
        +'<td style="border:1px solid gray">2</td>'
        +'<td style="border:1px solid gray">700</td>'
        +'<td style="border:1px solid gray">USED</td>'
      +'</tr>'
    +'</table>'
    +'<div style="min-height:12px"></div>'
    +'<div style="min-height:60px;border:1px solid gray">Remarks:</div>'
    +'<div style="min-height:12px"></div>'
    +'<div style="border:1px solid gray">'
    +'A service contract is an agreement between a contractor and a client that relays the terms and conditions of their working relationship. The completed document should detail the agreement period (whether it finishes on a specified date or after the job is completed) and the compensation the service provider will receive in exchange for their work. I have received all jobs and old spare parts.'
    +'</div>'
    +'<table style="width:100%">'
      +'<tr>'
        +'<td>Customer Signature<br/>Name:....................</td>'
        +'<td>Floor Supervisor<br/>Name:....................</td>'
        +'<td>Service Advisor Signature<br/>Name:....................</td>'
      +'</tr>'
    +'</table>'     
  +'</div>'
  +'</body></html>';
    myWindow.document.write(jcForTem);
  }
  //myWindow = window.open("", "", "width=300,height=300");
  //myWindow.opener.document.getElementById("demo").innerHTML = "HELLO!";
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
    ClientAddress:string,
    CreateDate:string,
    CreateBy:number,
    IsPaid:boolean,
    JcId:number,
    JcNo:string,
    GrandTotal:number,
    InvoiceItems:any,
    IsInvoice:number,
    BalanceAmount:number
  }={
    Id:0,
    ClientId:0,
    ClientName:'',
    ClientAddress:'',
    CreateDate:'',
    CreateBy:0,
    IsPaid:false,
    JcId:0,
    JcNo:'',
    GrandTotal:0,
    InvoiceItems:[],
    IsInvoice:0,
    BalanceAmount:0
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
    {MethodId:1,Name:'Cash'}
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
      /*var htmlPayment = '';
      for(var i = 0; i < this.oBill.PaySettles.length; i++){
        var sl = i + 1;
        htmlPayment+='<tr style="border:1px solid gray">'
            +'<td style="border:1px solid gray">'+sl+'</td>'
            +'<td style="border:1px solid gray">'+this.oBill.PaySettles[i].PayMethodName+'</td>'
            +'<td style="border:1px solid gray">'+this.oBill.PaySettles[i].PayDate+'</td>'
            +'<td style="border:1px solid gray;text-align: right;">'+this.oBill.PaySettles[i].Amount+'</td>'
            +'</tr>'
      }*/
      const myWindow: Window | null = window.open("", "", "width=793,height=1123");
      if(myWindow !=undefined) {
        var htmlPrint = '<!DOCTYPE html><html lang="en"><head><title>Bill-Copy</title></head><body>'
        +'<div style="margin-left:12px;margin-right:12px;margin-bottom:12px;margin-top:12px;">' 
          +'<table style="width:100%;border-collapse: collapse;">'
            +'<tr>'
              +'<td style="width:25%"><img style="width:180px" title="company_logo" style="width:102px" src="'+this.Bill_Logo+'" /></td>'
              +'<td style="width:50%">'
                +'<div style="text-align:center;font-size:larger">'
                +'<strong>'+this.company.CompanyName+'</strong>'
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
                +'<strong>Balance: </strong>'+this.oBill.BalanceAmount
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
            +'<th></th>'
            +'<th></th>'
            +'<th></th>'
            +'<th></th>'
            +'<th></th>'
            +'<th></th>'
            +'<th></th>'
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
            +'Payment'
            +'</table>'
            +'</div>';
        myWindow.document.write(htmlPrint);
      }
    });
  }

  pay():void{
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