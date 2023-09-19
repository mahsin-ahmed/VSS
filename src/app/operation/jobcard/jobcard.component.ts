import { Component, numberAttribute } from '@angular/core';
import { CommonService, toastPayload } from '../../services/common.service';
import { IndividualConfig } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-jobcard',
  templateUrl: './jobcard.component.html',
  styleUrls: ['./jobcard.component.css']
})
export class JobcardComponent {
  isNew:boolean = true;
  toast!: toastPayload;
  
  constructor(private cs:CommonService,
    private httpClient: HttpClient,
    private authService:AuthService) {
    this.get();
    this.getJobGroup();
    this.getJob();
    this.getEngineSize();
    this.getMechanic();
  }

  switchView(view:string):void{
    if(view=='form'){
      this.isList=false;
      this.getJcNo();
      this.getVehicleReceiver();
      this.getCompany();
    }else{
      this.isList=true;
      this.reset();
      this.get();
    }
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

  //baseUrl:string='http://localhost:56297';
  getJcNo(){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/JobCard/GetJCNo', {headers: oHttpHeaders}).subscribe((res)=>{
        this.JobCard.JcNo = res.toString();
    });
  }

  listReceiveBy:any=[];
  getVehicleReceiver(){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/JobCard/GetWorkGroupById?workGroupId=1',{headers: oHttpHeaders}).subscribe((res)=>{
        this.listReceiveBy = res;
    });
  }
  getMechanic(){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/JobCard/GetWorkGroupById?workGroupId=2',{headers:oHttpHeaders}).subscribe((res)=>{
        this.listMechanic = res;
    });
  }

  Company:{
    CompanyId:number
    ,CompanyCode:string
    ,CompanyName:string
    ,Description:string
    ,DateFormat:string
    ,DecimalPlace:number
    ,Bay:number
    ,Vat:number
    ,IsActive:boolean
      } ={
      CompanyId:0
      ,CompanyCode:''
      ,CompanyName:''
      ,Description:''
      ,DateFormat:''
      ,DecimalPlace:0
      ,Bay:0
      ,Vat:0
      ,IsActive:false
      };

  company: Array<Company>=[];
  getCompany(){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get<Company>(this.authService.baseURL + '/api/JobCard/GetCompany',{headers:oHttpHeaders}).subscribe((res)=>{
        //this.Company.Bay = res.Bay;
        this.listBay = [];
        for(var i = 0; i < res.Bay; i++){
          this.listBay.push(i+1);
        }
    });
  }

  listBay:any = [];

  Client : {
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
    DeleteBy:number,
    ContactPerson:string,
    ContactPersonNo:string,
    MembershipId:string
    } = {
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
    DeleteBy:0,
    ContactPerson:'',
    ContactPersonNo:'',
    MembershipId:''
    };
  listClient:any = [];
  addClient() {
    this.Client.BpId = new Date().getTime();
    this.JobCard.ClientId = this.Client.BpId;
    this.JobCard.ClientName = this.Client.Name;
    this.JobCard.ClientPhone = this.Client.Phone;
    this.JobCard.ClientEmail = this.Client.Email;
    this.JobCard.ClientAddress = this.Client.Address;
    this.listClient.push(this.Client);
    this.resetClient();
  }

  resetClient() {
      this.Client = {
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
      DeleteBy:0,
      ContactPerson:'',
      ContactPersonNo:'',
      MembershipId:''};
  }

  JobCard : {
    // Job-Card
    Id:number,
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
    JcStatus:number, // (Close/Open)
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

  reset() {
      this.JobCard ={
      Id:0,
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
  }

  resetJob() {
    this.JcJob = {
      Id:0,
      JcId:0,
      JobGroupId:0,
      JobId:0,
      EngineSizeId:0,
      Price:0,
      Duration:0,
      JobStatus:0
    };
  }

  JcJob:{
    Id:number,
    JcId:number,
    JobGroupId:number,
    JobId:number,
    EngineSizeId:number,
    Price:number,
    Duration:number,
    JobStatus:number
  } = {
    Id:0,
    JcId:0,
    JobGroupId:0,
    JobId:0,
    EngineSizeId:0,
    Price:0,
    Duration:0,
    JobStatus:0
  };

  //JobGroup:number = 0;
  listJobGroup:any = [];
  getJob(){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/JobCard/GetJob',{headers:oHttpHeaders}).subscribe((res)=>{
        this.listAllJob = res;
    });
  }

  getJobGroup(){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/JobCard/GetJobGroup',{headers:oHttpHeaders}).subscribe((res)=>{
        this.listJobGroup = res;
    });
  }

  listEngine:any=[];
  getEngineSize(){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/JobCard/GetEngineSize',{headers:oHttpHeaders}).subscribe((res)=>{
      this.listEngine = res;
    });
  }

  listJob:any = [];
  listAllJob:any = [];

  //Job:number = 0;
  changeJG(){
    this.listJob = [];
    this.listJob=this.listAllJob.filter((x:any)=>{return x.JobGroupId == this.JcJob.JobGroupId;});
  }

  //JobPrice:number = 0;
  //Duration:number = 0;
  //EngineSizeId:number = 0;
  //Mechanics:any = [];

  changeEngine(){
    this.JcJob.Duration = 0;
    this.JcJob.Price = 0;
    var oJob = this.listJob.filter((x:any)=>{return x.JobId == this.JcJob.JobId;})[0];
    if(oJob !==undefined){
      var oEngine = this.listEngine.filter((x:any)=>{return x.EngineSizeId == this.JcJob.EngineSizeId;})[0];
      if(oEngine!==undefined){
        if(oEngine.EngineSizeId == 1){
          this.JcJob.Duration = oJob.DurationA;
          this.JcJob.Price = oJob.A;
        } else if(oEngine.EngineSizeId == 2){
          this.JcJob.Duration = oJob.DurationB;
          this.JcJob.Price = oJob.B;
        } else if(oEngine.EngineSizeId == 3){
          this.JcJob.Duration = oJob.DurationC;
          this.JcJob.Price = oJob.C;
        }
      }
    }
  }

  listMechanic:any = [];

  listJcStatus:any=[{Id:1,Name:'Close'},{Id:2,Name:'Open'}];
  JobStatus:number = 0;
  listJobStatus:any=[{Id:1,Name:'Close'},{Id:2,Name:'Open'}];
  listJcJob:any=[];

  addJob(){
    var JobName = this.listAllJob.filter((x:any)=>x.JobId==this.JcJob.JobId)[0] ==undefined ? '' : this.listAllJob.filter((x:any)=>x.JobId==this.JcJob.JobId)[0].Description;
    var JobGroupName = this.listJobGroup.filter((x:any)=>x.GroupId==this.JcJob.JobGroupId)[0] ==undefined ? '' : this.listJobGroup.filter((x:any)=>x.GroupId==this.JcJob.JobGroupId)[0].Name;
    var EngineSizeName = this.listEngine.filter((x:any)=>x.EngineSizeId==this.JcJob.EngineSizeId)[0] ==undefined ? '' : this.listEngine.filter((x:any)=>x.EngineSizeId==this.JcJob.EngineSizeId)[0].Code + ' ' + this.listEngine.filter((x:any)=>x.EngineSizeId==this.JcJob.EngineSizeId)[0].CC;
    this.JobCard.JobDetails.push({
      Id:this.genId(),
      JobGroupId:this.JcJob.JobGroupId,
      JobId:this.JcJob.JobId,
      EngineSizeId:this.JcJob.EngineSizeId,
      Price:this.JcJob.Price,
      Duration:this.JcJob.Duration,
      JobStatus:this.JcJob.JobStatus,
      //Resources:this.JcJob.Resources,
      //Resources:Resources,
      JobGroupName:JobGroupName,
      JobName:JobName,
      EngineSizeName:EngineSizeName,
      JobStatusName:EngineSizeName
    });
    this.calculateEstiCost();
    this.resetJob();
  }

  updateJob(){
    var JobName = this.listAllJob.filter((x:any)=>x.JobId==this.JcJob.JobId)[0] ==undefined ? '' : this.listAllJob.filter((x:any)=>x.JobId==this.JcJob.JobId)[0].Description;
    var JobGroupName = this.listJobGroup.filter((x:any)=>x.GroupId==this.JcJob.JobGroupId)[0] ==undefined ? '' : this.listJobGroup.filter((x:any)=>x.GroupId==this.JcJob.JobGroupId)[0].Name;
    var EngineSizeName = this.listEngine.filter((x:any)=>x.EngineSizeId==this.JcJob.EngineSizeId)[0] ==undefined ? '' : this.listEngine.filter((x:any)=>x.EngineSizeId==this.JcJob.EngineSizeId)[0].Code + ' ' + this.listEngine.filter((x:any)=>x.EngineSizeId==this.JcJob.EngineSizeId)[0].CC;
    var Resources:any =[];
    for(var i =0; i< this.listMechanic.length; i++){
      if(this.listMechanic[i].IsSelect){
        Resources.push({EmployeeId:this.listMechanic[i].EmployeeId, FullName:this.listMechanic[i].FullName, JcJobId:this.JcJob.Id, JcId:this.JcJob.JcId}); 
      }
    }
    var oJcJob = this.JobCard.JobDetails.filter((x:any)=>x.Id == this.JcJob.Id)[0];
    if(oJcJob!==undefined) {
      oJcJob.JobGroupId=this.JcJob.JobGroupId;
      oJcJob.JobId=this.JcJob.JobId;
      oJcJob.EngineSizeId=this.JcJob.EngineSizeId;
      oJcJob.Price=this.JcJob.Price;
      oJcJob.Duration=this.JcJob.Duration;
      oJcJob.JobStatus=this.JcJob.JobStatus;
      //oJcSpare.Resources=this.JcJob.Resources;
      oJcJob.Resources=Resources;
      oJcJob.JobGroupName=JobGroupName;
      oJcJob.JobName=JobName;
      oJcJob.EngineSizeName=EngineSizeName;
      oJcJob.JobStatusName=oJcJob.JobStatus == 1 ? 'Close' : oJcJob.JobStatus == 2 ? 'Open' : '';
    }
    this.calculateEstiCost();
  }

  JcSpare:{
    Id:number,
    ItemId:number,
    ItemCode:string,
    ItemName:string,
    Barcode:string,
    ItemCategoryId:number,
    BrandId:number,
    Model:string,
    PartNoOld:string,
    PartNoNew:string,
    CategoryName:string,
    BrandName:string,
    SalePrice:number,
    Quantity:number,
    SpareAmount:number,
    ItemStatus:number,
    ItemStatusName:string
  }={
    Id:0,
    ItemId:0,
    ItemCode:'',
    ItemName:'',
    Barcode:'',
    ItemCategoryId:0,
    BrandId:0,
    Model:'',
    PartNoOld:'',
    PartNoNew:'',
    CategoryName:'',
    BrandName:'',
    SalePrice:0,
    Quantity:0,
    SpareAmount:0,
    ItemStatus:0,
    ItemStatusName:''
  };
  changeItem(){
    var oItem = this.listItem.filter((x:any)=>x.Id== this.JcSpare.Id)[0];
    if(oItem!==undefined){
      this.JcSpare.ItemCode=oItem.ItemCode;
      this.JcSpare.BrandName=oItem.BrandName;
      this.JcSpare.SalePrice = oItem.SalePrice;
    }
    this.calculateSpareAmount();
  }

  changeItemQty(){
    this.calculateSpareAmount();
  }

  calculateSpareAmount(){
    this.JcSpare.SpareAmount = this.JcSpare.SalePrice * this.JcSpare.Quantity;
  }

  listItem:any = [];

  //ItemStatus:number =0;
  listItemStatus:any=[{Id:1,Name:'User'},{Id:2,Name:'Refund'}];

  resetSpare(){
    this.JcSpare = {
      Id:0,
      ItemId:0,
      ItemCode:'',
      ItemName:'',
      Barcode:'',
      ItemCategoryId:0,
      BrandId:0,
      Model:'',
      PartNoOld:'',
      PartNoNew:'',
      CategoryName:'',
      BrandName:'',
      SalePrice:0,
      Quantity:0,
      SpareAmount:0,
      ItemStatus:0,
      ItemStatusName:''
    };
  }

  //SpareAmount:number=0;
  listJcSpare:any=[];
  
  addSpare() : void {
    this.JcSpare.SpareAmount = this.JcSpare.Quantity * this.JcSpare.SalePrice;
    this.JobCard.JcSpares = this.JobCard.JcSpares == undefined ? [] : this.JobCard.JcSpares;
    this.JobCard.JcSpares.push({
      Id:this.genId(),
      ItemId:this.JcSpare.ItemId,
      ItemCode:this.JcSpare.ItemCode,
      ItemName:this.JcSpare.ItemName,
      Barcode:this.JcSpare.Barcode,
      ItemCategoryId:this.JcSpare.ItemCategoryId,
      BrandId:this.JcSpare.BrandId,
      Model:this.JcSpare.Model,
      PartNoOld:this.JcSpare.PartNoOld,
      PartNoNew:this.JcSpare.PartNoNew,
      CategoryName:this.JcSpare.CategoryName,
      BrandName:this.JcSpare.BrandName,
      SalePrice:this.JcSpare.SalePrice,
      Quantity:this.JcSpare.Quantity,
      SpareAmount:this.JcSpare.SpareAmount,
      ItemStatus:this.JcSpare.ItemStatus,
      ItemStatusName:this.JcSpare.ItemStatus == 1 ? 'Used' : 'Refund',
    });
    this.calculateEstiCost();
    this.resetSpare();
  }

  updateSpare() : void {
    this.JcSpare.SpareAmount = this.JcSpare.Quantity * this.JcSpare.SalePrice;
    this.JobCard.JcSpares = this.JobCard.JcSpares == undefined ? [] : this.JobCard.JcSpares;
    var oJcSpare = this.JobCard.JcSpares.filter((x:any)=>x.Id == this.JcSpare.Id)[0];
    if(oJcSpare!==undefined) {
      oJcSpare.Id=this.JcSpare.Id;
      oJcSpare.ItemId=this.JcSpare.ItemId;
      //oJcSpare.oJcSpare.ItemCode=this.JcSpare.ItemCode;
      //oJcSpare.ItemName=this.JcSpare.ItemName;
      //oJcSpare.Barcode=this.JcSpare.Barcode;
      oJcSpare.ItemCategoryId=this.JcSpare.ItemCategoryId;
      oJcSpare.BrandId=this.JcSpare.BrandId;
      //oJcSpare.Model=this.JcSpare.Model;
      //oJcSpare.PartNoOld=this.JcSpare.PartNoOld;
      //oJcSpare.PartNoNew=this.JcSpare.PartNoNew;
      //oJcSpare.CategoryName=this.JcSpare.CategoryName;
      oJcSpare.BrandName=this.JcSpare.BrandName;
      oJcSpare.SalePrice=this.JcSpare.SalePrice;
      oJcSpare.Quantity=this.JcSpare.Quantity;
      oJcSpare.SpareAmount=this.JcSpare.SpareAmount;
      oJcSpare.ItemStatus=this.JcSpare.ItemStatus;
      oJcSpare.ItemStatusName=this.JcSpare.ItemStatus == 1 ? 'Used' : 'Refund';
    }
    this.calculateEstiCost();
    this.resetSpare();
  }

  calculateEstiCost(){
    this.JobCard.EstiCostJob = 0;
    this.JobCard.EstiCostSpare = 0;
    if(this.JobCard.JobDetails.length>0){
      this.JobCard.EstiCostJob = this.JobCard.JobDetails.map((x:any) => x.Price).reduce((prev:number, next:number) => prev + next);
    }
    if(this.JobCard.JcSpares.length>0){
      this.JobCard.EstiCostSpare = this.JobCard.JcSpares.map((x:any) => x.SpareAmount).reduce((prev:number, next:number) => prev + next);
    }
    this.JobCard.EstiCostTotal = this.JobCard.EstiCostJob + this.JobCard.EstiCostSpare;
  }

  listJobCard:any=[];
  isList:boolean=true;
  removeSpare(item:any){
    var isConfirm = confirm('Are you sure to remove?');
    if(isConfirm){
      this.JobCard.JcSpares = this.JobCard.JcSpares.filter((x:any)=>x.Id != item.Id);
      this.calculateEstiCost()
    }
  }
  removeJob(item:any){
    var isConfirm = confirm('Are you sure to remove?');
    if(isConfirm){
      this.JobCard.JobDetails = this.JobCard.JobDetails.filter((x:any)=>x.Id != item.Id);
      this.calculateEstiCost()
    }
  }

  getById(id:number):void{
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.httpClient.get(this.authService.baseURL + '/api/JobCard/'+id,{headers:oHttpHeaders}).subscribe((res)=>{
      let item:any = res;
      this.JobCard ={
        Id:item.Id,
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
      this.JobCard.Resources = (this.JobCard.Resources == null || this.JobCard.Resources == undefined) ? []:this.JobCard.Resources;
      for(var i = 0; i < this.listMechanic.length; i++){
        var oResource = this.JobCard.Resources.filter((x:any)=> x.EmployeeId == this.listMechanic[i].EmployeeId)[0];
        this.listMechanic[i].IsSelect = oResource!=undefined ? true : false;
      }
    });
  }

  edit(item:any):void{ 
    this.getById(item.Id);
    this.switchView('form');
  }

  editSpare(item:any):void {
    this.JcSpare = {
      Id:item.Id,
      ItemId:item.ItemId,
      ItemCode:item.ItemCode,
      ItemName:item.ItemName,
      Barcode:item.Barcode,
      ItemCategoryId:item.ItemCategoryId,
      BrandId:item.BrandId,
      Model:item.Model,
      PartNoOld:item.PartNoOld,
      PartNoNew:item.PartNoNew,
      CategoryName:item.CategoryName,
      BrandName:item.BrandName,
      SalePrice:item.SalePrice,
      Quantity:item.Quantity,
      SpareAmount:item.SpareAmount,
      ItemStatus:item.ItemStatus,
      ItemStatusName:item.ItemStatusName,
    };
  }

  editJob(item:any):void {
    this.JcJob = {
      Id:item.Id,
      JcId:item.JcId,
      JobGroupId:item.JobGroupId,
      JobId:item.JobId,
      EngineSizeId:item.EngineSizeId,
      Price:item.Price,
      Duration:item.Duration,
      JobStatus:item.JobStatus
    };
    this.changeJG();
  }

  genId():number{
    return new Date().getTime();
  }

  openWin(item:any) {
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

  VehicleNo:string = '';
  listJobCardS:any=[];
  searchVehicle(){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/JobCard/GetByVehicleNo?vehicleno='+this.VehicleNo,{headers:oHttpHeaders}).subscribe((res)=>{
      this.listJobCardS = res;
    });
  }

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
  jcStatus:number = 2;
  get(){
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.httpClient.get(this.authService.baseURL + '/api/JobCard?pi='+this.pageIndex+'&ps='+this.pageSize+'&jcStatus='+this.jcStatus,{headers: oHttpHeaders}).subscribe((res)=>{
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

  changePageSize(){
    this.get();
  }

  changePageNumber(pageIndex:number){
    this.pageIndex = pageIndex;
    this.get();
  }

  selectVehicle(item:any){
    //this.JobCard.JcNo=item.JcNo;
    this.JobCard.JobDate=item.JobDate;
    this.JobCard.CreateBy=item.CreateBy;
    this.JobCard.Vin=item.Vin;
    this.JobCard.Mileage=item.Mileage;
    this.JobCard.EstiCostTotal=item.EstiCostTotal;
    this.JobCard.EstiCostJob=item.EstiCostJob;
    this.JobCard.EstiCostSpare=item.EstiCostSpare;
    this.JobCard.ActualCostTotal=item.ActualCostTotal;
    this.JobCard.ActualCostJob=item.ActualCostJob;
    this.JobCard.ActualCostSpare=item.ActualCostSpare;
    this.JobCard.ReceiveDate=item.ReceiveDate;
    this.JobCard.ReceiveBy=item.ReceiveBy;
    this.JobCard.JobStart=item.JobStart;
    this.JobCard.JobEnd=item.JobEnd;
    this.JobCard.Bay=item.Bay;
    this.JobCard.VehicleNo=item.VehicleNo;
    this.JobCard.Model=item.Model;
    this.JobCard.JcStatus=item.JcStatus;
    this.JobCard.ClientId=item.ClientId;
    this.JobCard.ClientName=item.ClientName;
    this.JobCard.ClientPhone=item.ClientPhone;
    this.JobCard.ClientEmail=item.ClientEmail;
    this.JobCard.ClientAddress=item.ClientAddress;
    this.JobCard.ContactPerson=item.ContactPerson;
    this.JobCard.ContactPersonNo=item.ContactPersonNo;
    if(this.JobCard.ClientId>0){
      this.isNew = false;
    }
  }

  itemValue:string = '';
  listItemS:any = [];
  value:string ='';
  searchItem(){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/JobCard/GetItemByParts?value='+this.value,{headers:oHttpHeaders}).subscribe((res)=>{
      this.listItemS = res;
    });
  }

  selectItem(item:any){
    this.JcSpare.ItemId=item.Id;
    this.JcSpare.Barcode=item.Barcode;
    this.JcSpare.BrandId=item.BrandId;
    this.JcSpare.BrandName=item.BrandName;
    this.JcSpare.CategoryName=item.CategoryName;
    this.JcSpare.ItemCategoryId=item.ItemCategoryId;
    this.JcSpare.ItemCode=item.ItemCode;
    this.JcSpare.ItemName=item.ItemName;
    this.JcSpare.ItemStatus=item.ItemStatus;
    this.JcSpare.Model=item.Model;
    this.JcSpare.PartNoNew=item.PartNoNew;
    this.JcSpare.PartNoOld=item.PartNoOld;
    this.JcSpare.Quantity=item.Quantity;
    this.JcSpare.SalePrice=item.SalePrice;
    this.JcSpare.SpareAmount=item.SpareAmount;
  }

  add(){
    var Resources:any =[];
    for(var i =0; i< this.listMechanic.length; i++){
      if(this.listMechanic[i].IsSelect){
        Resources.push({EmployeeId:this.listMechanic[i].EmployeeId, FullName:this.listMechanic[i].FullName, JcId:this.JobCard.Id}); 
      }
    }
    this.JobCard.Resources = Resources;
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.post(this.authService.baseURL + '/api/JobCard', this.JobCard,{headers:oHttpHeaders}).subscribe((res) => {
      if (res == true) {
        this.isList = true;
        this.get();
        this.resetJob();
        this.reset();
        this.showMessage('success', 'data added.');
      } else {
        this.showMessage('error', 'error occurred.');
      }
    });
  }

  update(){
    var Resources:any =[];
    for(var i =0; i< this.listMechanic.length; i++){
      if(this.listMechanic[i].IsSelect){
        Resources.push({EmployeeId:this.listMechanic[i].EmployeeId, FullName:this.listMechanic[i].FullName, JcId:this.JobCard.Id}); 
      }
    }
    this.JobCard.Resources = Resources;
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.put(this.authService.baseURL + '/api/JobCard', this.JobCard,{headers:oHttpHeaders}).subscribe((res) => {
      if (res == true) {
        this.isList = true;
        this.get();
        this.resetJob();
        this.reset();
        this.showMessage('success', 'data added.');
      } else {
        this.showMessage('error', 'error occurred.');
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
