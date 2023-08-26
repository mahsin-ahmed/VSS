import { Component } from '@angular/core';
import { CommonService, toastPayload } from '../../services/common.service';
import { IndividualConfig } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {
  isNew:boolean = true;
  isList:boolean=true;
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
    DeleteBy:number,
    MembershipId:string
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
    DeleteBy:0,
    MembershipId:''
    };
  listClient:any = [];
  toast!: toastPayload;
  constructor(private cs:CommonService,private httpClient: HttpClient) { 
    this.get();
  }
  baseUrl:string='http://localhost:56297';
  get(){
    this.httpClient.get(this.baseUrl + '/api/Client').subscribe((res)=>{
        this.listClient = res;
    });
  }

  add() {
    this.httpClient.post(this.baseUrl + '/api/Client', this.Client).subscribe((res)=>{
      this.listClient = res;
      if(res == true){
        this.isList = true;
        this.get();
        this.reset();
        this.showMessage('success', 'data added.');
      }else{
        this.showMessage('error', 'error occurred.');
      }
    });
  }

  update(){
    this.httpClient.put(this.baseUrl + '/api/Client', this.Client).subscribe((res)=>{
      this.listClient = res;
      if(res == true){
        this.isList = true;
        this.get();
        this.showMessage('success', 'data updated.');
      }else{
        this.showMessage('error', 'error occurred.');
      }
  });
  }

  reset() {
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
    DeleteBy:0,
    MembershipId:''
    };
  }

  edit(item:any){
    this.Client ={
      BpId:item.BpId,
      Name:item.Name,
      Address:item.Address,
      Phone:item.Phone,
      Email:item.Email,
      BpTypeId:item.BpTypeId,
      IsActive:item.IsActive,
      CreateDate:item.CreateDate,
      CreateBy:item.CreateBy,
      UpdateDate:item.UpdateDate,
      UpdateBy:item.UpdateBy,
      IsDelete:item.IsDelete,
      DeleteDate:item.DeleteDate,
      DeleteBy:item.DeleteBy,
      MembershipId:item.MembershipId
      };
      this.isList = false;
  }

  remove(item:any){
    //var listDesi = this.listDesignate.filter((x:any)=>x.DesignateId != item.DesignateId);
    //this.listDesignate = listDesi;
    this.showMessage('success', 'data removed.');
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