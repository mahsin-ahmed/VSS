import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { IndividualConfig } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService, toastPayload } from 'src/app/services/common.service';

@Component({
  selector: 'app-clientvehicle',
  templateUrl: './clientvehicle.component.html',
  styleUrls: ['./clientvehicle.component.css']
})
export class ClientvehicleComponent {

  constructor(private cs: CommonService, 
    private httpClient: HttpClient,
    public authService:AuthService) {
    this.get();
    //this.getClient();
  }

  isList: boolean = true;
  listClientVehicle: any = [];
  listClient:any=[];
  phone:string = '';
  vehicle:string = '';
  get():void {
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/ClientVehicle?pi='+this.pageIndex+'&ps='+this.pageSize+'&phone='+this.phone+'&vehicle='+this.vehicle,{headers: oHttpHeaders}).subscribe((res) => {
      if(res) {
        this.listClientVehicle = res;
        //#region paging
        this.rowCount = this.listClientVehicle.length > 0 ? this.listClientVehicle[0].RowCount : 0;
        this.totalRowsInList = this.listClientVehicle.length;
        this.pager.totalPages = Math.ceil(this.rowCount / this.pageSize);
        this.pager.pages = [];
        for(var i = 0; i<this.pager.totalPages; i++){
          this.pager.pages.push(i+1);
        }
        this.pageStart = (this.pageIndex * this.pageSize) + 1;
        this.pageEnd = (this.pageStart - 1) + this.totalRowsInList;
        //#endregion
      }else{
        this.showMessage('warning', 'Session expired, please login.');
      }
    });
  }

  search():void {
    this.get();
  }

  getClient():void {
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/Client/GetClient', {headers: oHttpHeaders}).subscribe((res)=>{
        this.listClient = res;
    });
  }

  //clientinfo:string='';
  getClientByInfo():void {
    const oHttpHeaders = new HttpHeaders(
    {
      'Token':this.authService.UserInfo.Token
    });
    this.httpClient.get(this.authService.baseURL + '/api/Client/GetClientByInfo?value=' + this.ClientVehicle.Value,{headers: oHttpHeaders}).subscribe((res)=>{
        this.listClient = res;
    });
  }

  validateForm():boolean {
    var isValid:boolean=true;
    if(this.ClientVehicle.VehicleNo==undefined || this.ClientVehicle.VehicleNo==null || this.ClientVehicle.VehicleNo==''){
      isValid = false;
      this.showMessage('warning', 'Vehicle registration No. is required.');
    }
    /*if(this.ClientVehicle.ClientId==undefined||this.ClientVehicle.ClientId==null||this.ClientVehicle.ClientId==0){
      isValid = false;
      this.showMessage('warning', 'Client name is required.');
    }*/
    if(this.ClientVehicle.Value==undefined || this.ClientVehicle.Value==null || this.ClientVehicle.Value=='' || this.ClientVehicle.Value.includes('-') == false) {
      isValid = false;
      this.showMessage('warning', 'Client name is required.');
    }
    return isValid
  }

  add():void{
    if(!this.validateForm()){
      return;
    }
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.ClientVehicle.CreateBy = this.authService.UserInfo.UserID;
    this.httpClient.post(this.authService.baseURL + '/api/ClientVehicle', this.ClientVehicle,{headers: oHttpHeaders}).subscribe((res) => {
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

  edit(item: any):void {
    this.ClientVehicle = {      
    Id: item.Id,
    Manufacturer:item.Manufacturer,
    Model: item.Model,
    SubModel:item.SubModel,
    From:item.From,
    To:item.To,
    ClientId: item.ClientId,
    VehicleNo: item.VehicleNo,
    Vin: item.Vin,
    CreateBy:item.CreateBy,
    Value:item.Value,
    Body:item.Body,
    Engine:item.Engine,
    Transmission:item.Transmission,
    Remark:item.Remark
    };
    this.isList = false;
  }

  update():void{
    if(!this.validateForm()){
      return;
    }    
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.ClientVehicle.CreateBy = this.authService.UserInfo.UserID;
    this.httpClient.put(this.authService.baseURL + '/api/ClientVehicle', this.ClientVehicle,{headers: oHttpHeaders}).subscribe((res) => {
      if (res == true) {
        this.isList = true;
        this.get();
        this.showMessage('success', 'data updated.');
      } else {
        this.showMessage('error', 'error occurred.');
      }
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

  changePageSize():void {
    this.pageIndex = 0;
    this.get();
  }

  changePageNumber(pageIndex:number):void {
    this.pageIndex = pageIndex;
    this.get();
  }
  //#endregion

  ClientVehicle: {
    Id: number,
    Manufacturer:string,
    Model: string,
    SubModel: string,
    From:string,
    To:string,
    ClientId: number,
    VehicleNo: string,
    Vin: string,
    CreateBy:number,
    Value:string,
    Body:string,
    Engine:string,
    Transmission:string,
    Remark:string
  } = {
    Id: 0,
    Manufacturer:'',
    Model: '',
    SubModel: '',
    From:'',
    To:'',
    ClientId:0,
    VehicleNo: '',
    Vin: '',
    CreateBy:0,
    Value:'',
    Body:'',
    Engine:'',
    Transmission:'',
    Remark:''
    };
    
    toast!: toastPayload;

    showMessage(type: string, message: string):void {
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

  switchView(view: string): void {
    if (view == 'form') {
      this.isList = false;
      //this.getManufacturer();
    } else {
      this.isList = true;
      this.reset();
      this.pageIndex = 0;
      this.get();
    }
  }

  //listManufacturer:any=[];
  /*getManufacturer():void {
    this.ClientVehicle.Model = '';
    this.ClientVehicle.SubModel = '';
    this.ClientVehicle.From = '';
    this.ClientVehicle.To = '';
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.httpClient.get(this.authService.baseURL + '/api/ClientVehicle/GetManufacturer?manufacturer='+this.ClientVehicle.Manufacturer+'&offset=0&fetch=20',{headers: oHttpHeaders}).subscribe((res) => {
      if(res) {
        this.listManufacturer = res;
      } else{
        this.showMessage('warning', 'Session expired, please login.');
      }
    });
  }*/

  //listModel:any=[];
  /*getModel():void {
    this.ClientVehicle.SubModel = '';
    this.ClientVehicle.From = '';
    this.ClientVehicle.To = '';
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.httpClient.get(this.authService.baseURL + '/api/ClientVehicle/GetModel?manufacturer='+this.ClientVehicle.Manufacturer+'&model='+this.ClientVehicle.Model+'&offset=0&fetch=20',{headers: oHttpHeaders}).subscribe((res) => {
      if(res){
        this.listModel = res;
      } else{
        this.showMessage('warning', 'Session expired, please login.');
      }
    });
  }*/

  //listSubModel:any = [];
  /*getSubModel():void {
    this.ClientVehicle.From = '';
    this.ClientVehicle.To = '';
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.httpClient.get(this.authService.baseURL + '/api/ClientVehicle/GetSubModel?manufacturer='+this.ClientVehicle.Manufacturer+'&model='+this.ClientVehicle.Model+'&subModel='+this.ClientVehicle.SubModel+'&offset=0&fetch=20',{headers: oHttpHeaders}).subscribe((res) => {
      if(res){
        this.listSubModel = res;
      }else{
        this.showMessage('warning', 'Session expired, please login.');
      }
    });
  }*/

  //listFrom:any = [];
  /*getFrom():void {
    this.ClientVehicle.To = '';
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.httpClient.get(this.authService.baseURL + '/api/ClientVehicle/getFrom?manufacturer='+this.ClientVehicle.Manufacturer+'&model='+this.ClientVehicle.Model+'&subModel='+this.ClientVehicle.SubModel+'&from='+this.ClientVehicle.From+'&offset=0&fetch=100',{headers: oHttpHeaders}).subscribe((res) => {
      if(res){
        this.listFrom = res;
      }else{
        this.showMessage('warning', 'Session expired, please login.');
      }
    });
  }*/

  //listTo:any = [];
  /*getTo():void {
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.httpClient.get(this.authService.baseURL + '/api/ClientVehicle/GetTo?manufacturer='+this.ClientVehicle.Manufacturer+'&model='+this.ClientVehicle.Model+'&subModel='+this.ClientVehicle.SubModel+'&from='+this.ClientVehicle.From+'&to='+this.ClientVehicle.To+'&offset=0&fetch=100',{headers: oHttpHeaders}).subscribe((res) => {
      if(res){
        this.listTo = res; 
      }else{
        this.showMessage('warning', 'Session expired, please login.');
      }
    });
  }*/

  reset():void {

  }

  isSearching:boolean = false;
  searchVin():void{
    this.isSearching = true;
    const oHttpHeaders = new HttpHeaders(
    {
        //'Token':this.authService.UserInfo.Token
    });
    this.httpClient.get(this.authService.baseURL + '/api/ClientVehicle/GetCarByVin?vin='+this.ClientVehicle.Vin,{headers: oHttpHeaders}).subscribe((res) => {
      if(res){
        var oClientVehicle:any = res;
        this.ClientVehicle.Manufacturer = oClientVehicle.Manufacturer;
        this.ClientVehicle.Model = oClientVehicle.Model;
        this.ClientVehicle.From = oClientVehicle.From;
        this.ClientVehicle.Body = oClientVehicle.Body;
        this.ClientVehicle.Engine = oClientVehicle.Engine;
        this.ClientVehicle.Transmission = oClientVehicle.Transmission;
        this.isSearching = false;
      }else{
        this.showMessage('warning', 'Session expired, please login.');
      }
    });
  }

}