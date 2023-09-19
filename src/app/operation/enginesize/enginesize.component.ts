import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/services/common.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-enginesize',
  templateUrl: './enginesize.component.html',
  styleUrls: ['./enginesize.component.css']
})
export class EnginesizeComponent {
  constructor(private cs:CommonService,
    private httpClient: HttpClient,
    private authService:AuthService) { 
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
//baseUrl:string='http://localhost:56297';

getEngineList(){
  const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
  this.httpClient.get(this.authService.baseURL + '/api/enginesize',{headers: oHttpHeaders}).subscribe((res)=>{
      this.listEngine = res;
  });
}
addEngine() {
  const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
  this.httpClient.post(this.authService.baseURL + '/api/EngineSize', this.Engines,{headers: oHttpHeaders}).subscribe((res)=>{
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
  const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
  this.httpClient.delete(this.authService.baseURL + '/api/EngineSize/' + item.EngineSizeId,{headers: oHttpHeaders}).subscribe((res)=>{
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
  const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
  this.httpClient.put(this.authService.baseURL + '/api/EngineSize', this.Engines,{headers: oHttpHeaders}).subscribe((res)=>{
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
