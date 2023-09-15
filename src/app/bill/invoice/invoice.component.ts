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
    private authService:AuthService) {
    this.get();
  }

  get(){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/Invoice?pi='+this.pageIndex+'&ps='+this.pageSize+'&jcStatus=1&IsPaid=1',{headers:oHttpHeaders}).subscribe((res)=>{
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

  openWin() {
    const myWindow: Window | null = window.open("", "", "width=793,height=1123");
    if(myWindow !=undefined){
      var jcForPad = '<!DOCTYPE html><html lang="en"><head><title>Job-Card</title></head><body>'
  +'<div style="margin-left:12px;margin-right:12px;margin-bottom:12px;margin-top:96px;">' 
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
var jcForTem = '<!DOCTYPE html><html lang="en"><head><title>Job-Card</title></head><body>'
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
  //Discount:number=0
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
    IsInvoice:number
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
    IsInvoice:0
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
    this.httpClient.get(this.authService.baseURL + '/api/JobCard/GetByJc?jcId='+id,{headers:oHttpHeaders}).subscribe((res)=>{
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

   GrandTotal:number = 0;
   calculateTotals():void{
    this.GrandTotal = 0;
    for(var i = 0; i <this.listBillItem.length; i++) {
      var Price = this.listBillItem[i].UnitPrice == undefined ? 0 : this.listBillItem[i].UnitPrice;
      var Qty = this.listBillItem[i].Qty == undefined ? 0 : this.listBillItem[i].Qty;
      var Discount:number = this.listBillItem[i].Discount == undefined ? 0 : this.listBillItem[i].Discount;
      var TotalPrice = Price * Qty;
      var DiscountAmountOnTotalPrice = TotalPrice * (Discount/100);
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

   ItemTypes:any = [
    {ItemTypeId:1,ItemTypeName:'Job'},
    {ItemTypeId:2,ItemTypeName:'SP'}
  ];
   addToBill():void{
    //this.oBill.JcId = this.JobCard.JcId;
    this.oBill.JcId = this.JobCard.Id;
    this.oBill.ClientId = this.JobCard.ClientId;
    this.oBill.ClientName = this.JobCard.ClientName;
    this.oBill.JcNo = this.JobCard.JcNo;
    this.listBillItem = [];
    this.GrandTotal = 0;
    for(var i = 0; i <this.JobCard.JobDetails.length; i++){
      var Price:number = this.JobCard.JobDetails[i].Price == undefined ? 0 :this.JobCard.JobDetails[i].Price;
      var Discount:number = this.JobCard.JobDetails[i].Discount == undefined ? 0 :this.JobCard.JobDetails[i].Discount;
      var TotalPrice:number = Price * 1;
      var DiscountAmountOnTotalPrice: number = TotalPrice * (Discount/100);
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
        Discount:Discount,
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
      var Discount:number = this.JobCard.JcSpares[i].Discount == undefined ? 0 : this.JobCard.JcSpares[i].Discount;
      var TotalPrice = SalePrice * Quantity;
      var DiscountAmountOnTotalPrice = TotalPrice * (Discount/100);
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
        Discount:Discount,
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
    PayMethodId:number
  }={
    TrxId:'',
    Amount:0,
    Remarks:'',
    BusinessPartnerId:0,
    PayMethodId:0
  }
  payment():void{
    this.PayTran.BusinessPartnerId = this.oBill.ClientId;
    this.PayTran.Amount = this.oBill.GrandTotal;
  }

  pay():void{
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
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
