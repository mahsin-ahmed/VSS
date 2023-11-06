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
    this.getClient();
  }
  isList: boolean = true;
  listClientVehicle: any = [];
  listClient:any=[];
  phone:string = '';
  vehicle:string = '';
  get() {
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/ClientVehicle?pi='+this.pageIndex+'&ps='+this.pageSize+'&phone='+this.phone+'&vehicle='+this.vehicle,{headers: oHttpHeaders}).subscribe((res) => {
      if(res)
      {
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

  search():void{
    this.get();
  }

  getClient(){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/Client',{headers: oHttpHeaders}).subscribe((res)=>{
        this.listClient = res;
    });
  }

  validateForm():boolean{
    var isValid:boolean=true;
    if(this.ClientVehicle.ClientId==undefined||this.ClientVehicle.ClientId==null||this.ClientVehicle.ClientId==0){
      isValid = false;
      this.showMessage('warning', 'Client is required.');
    }
    return isValid
  }
  add(){
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

  edit(item: any) {
    this.ClientVehicle = {      
    Id: item.Id,
    VehicleNo: item.VehicleNo,
    Model: item.Model,
    Vin: item.Vin,
    ClientId: item.ClientId,
    CreateBy:item.CreateBy
    };
    this.isList = false;
  }

  update(){
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

  changePageSize(){
    this.pageIndex = 0;
    this.get();
  }

  changePageNumber(pageIndex:number){
    this.pageIndex = pageIndex;
    this.get();
  }
  //#endregion

  ClientVehicle: {
    Id: number,
    VehicleNo: string,
    Model: string,
    Vin: string,
    ClientId: number,
    CreateBy:number
  } = {
    Id: 0,
    VehicleNo: '',
    Model: '',
    Vin: '',
    ClientId:0,
    CreateBy:0
    };
    
    toast!: toastPayload;

    showMessage(type: string, message: string) {
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
    } else {
      this.isList = true;
      this.reset();
      this.pageIndex = 0;
      this.get();
    }
  }

  reset() {}

}
