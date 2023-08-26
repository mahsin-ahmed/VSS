import { Component } from '@angular/core';
import { CommonService, toastPayload } from '../../services/common.service';
import { IndividualConfig } from 'ngx-toastr';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent {
  isList:boolean=true;
  listDesignate:any =[
    {
    DesignateId:2,
    Name:'Floor Supervisor',
    Short:'FS'
  },
  {
    DesignateId:3,
    Name:'Mechanic',
    Short:'M'
  }
];
  designat:{
    DesignateId:number,
    Name:string,
    Short:string
  }={
    DesignateId:0,
    Name:'',
    Short:''
  };
  toast!: toastPayload;
  constructor(private cs:CommonService) { 
  }

  reset(){
    this.designat ={
      DesignateId:0,
      Name:'',
      Short:''
    };
  }

  edit(item:any){
    this.designat ={
      DesignateId:item.DesignateId,
      Name:item.Name,
      Short:item.Short
    };
    this.isList = false;
  }

  remove(item:any){
    var listDesi = this.listDesignate.filter((x:any)=>x.DesignateId != item.DesignateId);
    this.listDesignate = listDesi;
    this.showMessage('success', 'data removed.');
  }

  add(){
    this.designat.DesignateId = new Date().getTime(); // generate id
    this.listDesignate.push(this.designat);
    this.reset();
    this.isList = true;
    this.showMessage('success', 'data added.');
  }

  update(){
    var oDesi = this.listDesignate.filter((x:any)=>x.DesignateId == this.designat.DesignateId)[0];
    oDesi.Short = this.designat.Short;
    oDesi.Name = this.designat.Name;
    this.reset();
    this.isList = true;
    this.showMessage('success', 'data updated.');
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
