import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {
  isList:boolean=true;
  listJobCard:any=[
    {
    JcNo:'1001',
    JobDate:'2023-05-19',
    CreateBy:9,
    Vin:'FV65765',
    Mileage:4200,
    EstiCostTotal:26000,
    EstiCostJob:15000,
    EstiCostSpare:11000,
    ActualCostTotal:27000,
    ActualCostJob:15000,
    ActualCostSpare:12000,
    ReceiveDate:'2023-05-19',
    ReceiveBy:1,
    JobStart:'2023-05-19',
    JobEnd:'2023-05-25',
    Bay:2,
    VehicleNo:'DM-FA-33-6842',
    Model:'M6574',
    JcStatus:2,
    ClientId:1,
    ClientName:'Mr. Robin',
    ClientPhone:'0176474668',
    ClientEmail:'one@email.com',
    ClientAddress:'Dhanmondi',
    ContactPerson:'Mostofa',
    ContactPersonNo:'01985541226',
    Description:'',
    JobDetails:[],
    JcSpares:[],
    JcHr:[]
  },
  {
    JcNo:'1002',
    JobDate:'2023-05-19',
    CreateBy:9,
    Vin:'FV546456',
    Mileage:4200,
    EstiCostTotal:26000,
    EstiCostJob:15000,
    EstiCostSpare:11000,
    ActualCostTotal:27000,
    ActualCostJob:15000,
    ActualCostSpare:12000,
    ReceiveDate:'2023-05-19',
    ReceiveBy:1,
    JobStart:'2023-05-19',
    JobEnd:'2023-05-25',
    Bay:2,
    VehicleNo:'CM-BA-88-3698',
    Model:'M6574',
    JcStatus:2,
    ClientId:2,
    ClientName:'Mr. Goni',
    ClientPhone:'01853544152',
    ClientEmail:'chitt@email.com',
    ClientAddress:'Oxizen, Chittagong',
    ContactPerson:'Abul',
    ContactPersonNo:'01865547141',
    Description:'',
    JobDetails:[],
    JcSpares:[],
    JcHr:[]
  }
];
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

  }
}
