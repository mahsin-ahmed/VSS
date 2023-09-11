import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/services/common.service';

@Component({
  selector: 'app-enginesize',
  templateUrl: './enginesize.component.html',
  styleUrls: ['./enginesize.component.css']
})
export class EnginesizeComponent {
  constructor(private cs:CommonService,private httpClient: HttpClient) { 
    this.getEngineList();
  }

  // for swaping two views, list of items and entry form
  isList:boolean=true;

  // Engine object declaration
  listEngine:any=[];

Engines:{
  EngineSizeId:number,
  Code:string,
  Description:string,
  CC:string
}={
  EngineSizeId:0,
  Code:'',
  Description:'',
  CC:''
};
// getting data from database for display
baseUrl:string='http://localhost:56297';

getEngineList(){
  this.httpClient.get(this.baseUrl + '/api/enginesize').subscribe((res)=>{
      this.listEngine = res;
  });
}
addEngine() {
  this.httpClient.post(this.baseUrl + '/api/EngineSize', this.Engines).subscribe((res)=>{
    if(res == true){
      this.isList = true;
      this.getEngineList();
      this.reset();
      this.showMessage('success', 'data added.');
    }else{
      this.showMessage('error', 'error occurred.');
    }
  });
}

removeEngine(item:any){
  this.httpClient.delete(this.baseUrl + '/api/EngineSize/' + item.EngineSizeId).subscribe((res)=>{
    if(res == true){
      this.getEngineList();
      this.showMessage('success', 'data removed.');
    }else{
      this.showMessage('error', 'error occurred.');
    }
  });  
}

edit(item:any){
  this.Engines = {
    EngineSizeId:item.EngineSizeId,
    Code:item.Code,
    Description:item.Description,
    CC:item.CC
  };
  this.isList = false;
}

updateEngine(){
  this.httpClient.put(this.baseUrl + '/api/EngineSize', this.Engines).subscribe((res)=>{
    if(res == true){
      this.isList = true;
      this.getEngineList();
      this.showMessage('success', 'data updated.');
    }else{
      this.showMessage('error', 'error occurred.');
    }
});
}

reset(){
  this.Engines ={
    EngineSizeId: 0,
    Code:'',
    Description:'',
    CC:''
  };
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

  switchView(view:string):void{
    if(view=='form'){
      this.isList=false;
    }else{
      this.isList=true;
      this.reset();
    }
  }
}
