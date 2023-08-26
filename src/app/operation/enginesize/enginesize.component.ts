import { Component } from '@angular/core';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/services/common.service';

@Component({
  selector: 'app-enginesize',
  templateUrl: './enginesize.component.html',
  styleUrls: ['./enginesize.component.css']
})
export class EnginesizeComponent {
  constructor(private cs:CommonService) { 
  }

  // for swaping two views, list of items and entry form
  isList:boolean=true;

  // Dummy data for view
  listEngine:any=[
    {
    EngineSizeId:'1001',
    Code:'A',
    Description:'CAR-(6-8) Wagon',
    CC:'1500-2500'
  },
  {    
    EngineSizeId:'1002',
    Code:'B',
    Description:'CAR/4 Cylinder',
    CC:'800-1500'
  },
  {    
    EngineSizeId:'1003',
    Code:'C',
    Description:'Wagon/ Suv(6-8) Cylinder',
    CC:'2500-4500'
  }
];

engines:{
  id:number,
  EngineSizeId:number,
  Code:string,
  Description:string,
  CC:string
}={
  id:0,
  EngineSizeId:0,
  Code:'',
  Description:'',
  CC:''
};

add(){
  this.engines.EngineSizeId = Math.floor((Math.random() * 10000) + 1); // generate id
  this.listEngine.push(this.engines);
  this.reset();
  this.isList = true;
  this.showMessage('success', 'data added.');
}

edit(item:any){
  this.engines = {
    id:1,
    EngineSizeId:item.EngineSizeId,
    Code:item.Code,
    Description:item.Description,
    CC:item.CC
  };
  this.isList = false;
}

update(){
  var existingEngine = this.listEngine.filter((x:any)=>x.EngineSizeId == this.engines.EngineSizeId)[0];
  existingEngine.EngineSizeId = this.engines.EngineSizeId;
  existingEngine.Code = this.engines.Code;
  existingEngine.Description = this.engines.Description;
  existingEngine.CC = this.engines.CC;
  this.reset();
  this.isList = true;
  this.showMessage('success', 'data updated.');
}

reset(){
  this.engines ={
    id:0,
    EngineSizeId: 0,
    Code:'',
    Description:'',
    CC:''
  };
}
remove(item:any){
  var selectedEngineRemove = this.listEngine.filter((x:any)=>x.EngineSizeId != item.EngineSizeId);
  this.listEngine = selectedEngineRemove;
  this.showMessage('success', 'data removed.');
} 


toast!: toastPayload;

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
