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

  listDesignate:any =[{"DesignateId":1,"Name":"Chairman","Short":"C"},{"DesignateId":2,"Name":"Vice Chairman","Short":"VC"},{"DesignateId":3,"Name":"Managing Director","Short":"MD"},{"DesignateId":4,"Name":"Director","Short":"D"},{"DesignateId":5,"Name":"General Manager","Short":"GM"},{"DesignateId":6,"Name":"Joint General Manager","Short":"JGM"},{"DesignateId":7,"Name":"Deputy General Manager","Short":"DGM"},{"DesignateId":8,"Name":"Asst. General Manager","Short":"AGM"},{"DesignateId":9,"Name":"Chief Manager","Short":"CM"},{"DesignateId":10,"Name":"Sr. Manager","Short":"SM"},{"DesignateId":11,"Name":"Manager","Short":"M"},{"DesignateId":12,"Name":"Joint Manager","Short":"JM"},{"DesignateId":13,"Name":"Deputy Manager","Short":"DM"},{"DesignateId":14,"Name":"Asst. Manager","Short":"AM"},{"DesignateId":15,"Name":"Sr. Executive","Short":"SE"},{"DesignateId":16,"Name":"Executive","Short":"E"},{"DesignateId":17,"Name":"Jr. Executive","Short":"JE"},{"DesignateId":18,"Name":"Sr. Associate","Short":"SA"},{"DesignateId":20,"Name":"Assistant","Short":"A"}];
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
