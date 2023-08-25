import { Component, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-jobcard',
  templateUrl: './jobcard.component.html',
  styleUrls: ['./jobcard.component.css']
})
export class JobcardComponent {
  isNew:boolean = true;
  Client :{
    BpId:number,
    Name:string,
    Address:string,
    Phone:string,
    Email:string,
    BpTypeId:number,
    IsActive:boolean,
    CreateDate:'',
    CreateBy:number,
    UpdateDate:'',
    UpdateBy:number,
    IsDelete:boolean,
    DeleteDate:'',
    DeleteBy:number
    }={
      BpId:0,
    Name:'',
    Address:'',
    Phone:'',
    Email:'',
    BpTypeId:0,
    IsActive:false,
    CreateDate:'',
    CreateBy:0,
    UpdateDate:'',
    UpdateBy:0,
    IsDelete:false,
    DeleteDate:'' ,
    DeleteBy:0
    };
  listClient:any = [];
  addClient() {
    this.listClient.push(this.Client);
    this.resetClient();
  }

  resetClient() {
      this.Client ={
        BpId:0,
      Name:'',
      Address:'',
      Phone:'',
      Email:'',
      BpTypeId:0,
      IsActive:false,
      CreateDate:'',
      CreateBy:0,
      UpdateDate:'',
      UpdateBy:0,
      IsDelete:false,
      DeleteDate:'' ,
      DeleteBy:0
          };
         }

  JobCard : {
    JcNo:string,
    ClientId:number,
    Description:string,
    VehicleNo:string,
    Model:string,
    Vin:string,
    Mileage:number,
    Bay:number,
    EstiCostTotal:number,
    EstiCostJob:number,
    EstiCostSpare:number,
    ReceiveDate:string,
    ReceiveBy:number,
    IsDone:boolean,
    IsPaid:boolean,
    DocTypeId:number,
    ArriveDate:string,
    JobDetails:any,
    Spares:any
   }={
    JcNo:this.genJcNo(),
    ClientId:0,
    Description:'',
    VehicleNo:'',
    Model:'',
    Vin:'',
    Mileage:0,
    Bay:0,
    EstiCostTotal:0,
    EstiCostJob:0,
    EstiCostSpare:0,
    ReceiveDate:'',
    ReceiveBy:0,
    IsDone:false,
    IsPaid:false,
    DocTypeId:0,
    ArriveDate:'',
    JobDetails:[],
    Spares:[]
   };

   resetJc(){
    this.JobCard ={
      JcNo:this.genJcNo(),
      ClientId:0,
      Description:'',
      VehicleNo:'',
      Model:'',
      Vin:'',
      Mileage:0,
      Bay:0,
      EstiCostTotal:0,
      EstiCostJob:0,
      EstiCostSpare:0,
      ReceiveDate:'',
      ReceiveBy:0,
      IsDone:false,
      IsPaid:false,
      DocTypeId:0,
      ArriveDate:'',
      JobDetails:[],
      Spares:[]
     };
   }
    
    JcJob:{
      JcJobId:number,
      JobGroupId:number,
      JobGroup:string,
      JobId:number,
      Job:string,
      EngineSizeId:number,
      EngineSize:string,
      Price:number,
      Duration:number,
      JobStatus:number,
      JcResource:any
    }={
      JcJobId:0,
      JobGroupId:0,
      JobGroup:'',
      JobId:0,
      Job:'',
      EngineSizeId:0,
      EngineSize:'',
      Price:0,
      Duration:0,
      JobStatus:0,
      JcResource:[]
    };

    ClientName:string = '';
    listBay:any = [1,2,3,4,5,6,7,8];
    JobGroup:number = 0;
    listJobGroup:any = [
      {GroupId:1, Name:'Engine Work & Tune Up'},
      {GroupId:2, Name:'Wheel Balancing'}
  ];

  listJob:any = [];
  listOfJob:any = [
    {JobId:1, Description:'Fuel System Servicing (D4)',JobGroupId: 1, A:4500,B:4500,C:6500,DurationA:30,DurationB:45, DurationC:60},
    {JobId:2, Description:'EGR Servicing',JobGroupId: 1, A:500,B:1000,C:1500,DurationA:30,DurationB:45, DurationC:60},
    {JobId:3, Description:'Computerized Wheel Balancing (per-wheel)(A 13-16),b(17-18),c(19-24)',JobGroupId: 2, A:500,B:600,C:800,DurationA:30,DurationB:45, DurationC:60},
    {JobId:4, Description:'Weight (per-gram, Clip/Adhenic)',JobGroupId: 2, A:5,B:5,C:5,DurationA:30,DurationB:45, DurationC:60},
  ];

  listEngine:any=[
  {EngineId:1,Code:'A',CC:'800-1500',Description:'CAR/4 Cylinder'},
  {EngineId:2,Code:'B',CC:'1501-2500',Description:'CAR-(6-8) Cylinder,Van, Wagon-(4-6) Cyl/Wagon, Suv-4-Cyl'},
  {EngineId:3,Code:'C',CC:'2501-4500',Description:'Wagon/ Suv(6-8) Cylinder'}
];


  Job:number = 0;
  changeJG(){
    this.listJob = [];
    this.listJob=this.listOfJob.filter((x:any)=>{return x.JobGroupId == this.JobGroup;});
  }

  JobPrice:number = 0;
  Duration:number = 0;
  EngineId:number = 0;
  Employees:any = [];
  changeJob(){
  }

  changeEngine(){
    this.Duration = 0;
    this.JobPrice = 0;
    var oJob = this.listJob.filter((x:any)=>{return x.JobId == this.Job;})[0];
    if(oJob !==undefined){
      var oEngine = this.listEngine.filter((x:any)=>{return x.EngineId == this.EngineId;})[0];
      if(oEngine!==undefined){
        if(oEngine.EngineId == 1){
          this.Duration = oJob.DurationA;
          this.JobPrice = oJob.A;
        } else if(oEngine.EngineId == 2){
          this.Duration = oJob.DurationB;
          this.JobPrice = oJob.B;
        } else if(oEngine.EngineId == 3){
          this.Duration = oJob.DurationC;
          this.JobPrice = oJob.C;
        }
      }
    }
  }

  listEmp:any = [
    {EmployeeId:1, FirstName:'Arif', MiddleName:'',LastName:'',Designation:'Supervisor'},
    {EmployeeId:2, FirstName:'Habib', MiddleName:'',LastName:'',Designation:'Machanic'},
    {EmployeeId:3, FirstName:'Tutul', MiddleName:'',LastName:'',Designation:'Machanic'}
  ];

  changeEmployee(){
    console.log(this.Employees);
  }

  JobStatus:number = 0;
  listJobStatus:any=[{Id:1,Name:'Close'},{Id:2,Name:'Open'}];
  listJcJob:any=[];
  addJob(){
    this.listJcJob.push({
      JobGroupId:this.JobGroup,
      JobId:this.Job,
      EngineSizeId:this.EngineId,
      Price:this.JobPrice,
      Duration:this.Duration,
      JobStatus:this.JobStatus,
      Resources:this.Employees
    });
    this.calculateEstiCost();
  }

  ItemId:number = 0;
  ItemCode:number = 0;
  Quantity:number =0;
  Brand:string ='';
  SparePrice:number = 0;
  changeItem(){
    var oItem = this.listItem.filter((x:any)=>x.Id== this.ItemId)[0];
    if(oItem!==undefined){
      this.ItemCode=oItem.ItemCode;
      this.Brand=oItem.Brand;
      this.SparePrice = oItem.Price;
    }
    this.calculateSpareAmount();
  }

  changeItemQty(){
    this.calculateSpareAmount();
  }

  calculateSpareAmount(){
    this.SpareAmount = this.SparePrice * this.Quantity;
  }

  listItem:any = [
    {Id:1,ItemCode:'001',ItemName:'RELAY 12V 30A - RI', Brand: 'Nissan', Price: 200},
    {Id:2,ItemCode:'002',ItemName:'RELAY BASE - WI', Brand: 'Toyota', Price: 100}
  ];

  ItemStatus:number =0;
  listItemStatus:any=[{Id:1,Name:'USED'},{Id:2,Name:'REFUND'}];

  SpareAmount:number=0;
  listJcSpare:any=[];
  addSpare(){
    this.SpareAmount = this.Quantity * this.SparePrice;
    this.listJcSpare.push({
      ItemId:this.ItemId,
      ItemCode:this.ItemCode,
      Brand:this.Brand,
      Quantity:this.Quantity,
      ItemStatus:this.ItemStatus,
      Price:this.SparePrice,
      SpareAmount:this.SpareAmount
    });
    this.calculateEstiCost();
  }

  calculateEstiCost(){
    this.JobCard.EstiCostJob = 0;
    this.JobCard.EstiCostSpare = 0;
    if(this.listJcJob.length>0){
      this.JobCard.EstiCostJob = this.listJcJob.map((x:any) => x.Price).reduce((prev:number, next:number) => prev + next);
    }
    if(this.listJcSpare.length>0){
      this.JobCard.EstiCostSpare = this.listJcSpare.map((x:any) => x.SpareAmount).reduce((prev:number, next:number) => prev + next);
    }
    this.JobCard.EstiCostTotal = this.JobCard.EstiCostJob + this.JobCard.EstiCostSpare;
  }

  listJobCar:any=[];
  addJobCard(){
    this.JobCard.JcNo = this.genJcNo();
    this.JobCard.ReceiveDate = new Date().toLocaleString();
    this.listJobCar.push(this.JobCard);
    this.isList = true;
  }

  isList:boolean=true;
  removeItem(item:any){
    this.listJcSpare = this.listJcSpare.filter((x:any)=>x.ItemId != item.ItemId);
    this.calculateEstiCost()
  }
  removeJob(item:any){
    this.listJcJob = this.listJcJob.filter((x:any)=>x.JobId != item.JobId);
    this.calculateEstiCost()
  }
  edit(item:any){

  }
  genJcNo():string{
    return new Date().getTime().toString().split('.')[0];
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
}
