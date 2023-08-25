import { Component } from '@angular/core';

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
      DeleteBy:0,
      MembershipId:''
          };
         }
}
