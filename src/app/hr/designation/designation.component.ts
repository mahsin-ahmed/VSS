import { Component } from '@angular/core';
import { CommonService, toastPayload } from '../../services/common.service';
import { IndividualConfig } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.css']
})
export class DesignationComponent {
  isList:boolean=true;
  isNew:boolean = true;
  phone:string = '';  
  toast!: toastPayload;

  constructor(private cs:CommonService,
    private httpClient: HttpClient,
    public authService:AuthService) { 
    this.get();
  }

  get(){
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.httpClient.get(this.authService.baseURL + '/api/Designation?pi='+this.pageIndex+'&ps='+this.pageSize+'&phone='+this.phone,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res){
        this.listDesignation = res;  
        //#region paging
        this.rowCount = this.listDesignation.length > 0 ? this.listDesignation[0].RowCount : 0;
        this.totalRowsInList = this.listDesignation.length;
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
  
  validateForm():boolean{
    var isValid:boolean=true;
    if(this.Designation.Name==undefined||this.Designation.Name==null||this.Designation.Name==''){
      isValid = false;
      this.showMessage('warning', 'name is required.');
    }
    if(this.Designation.Short==undefined||this.Designation.Short==null||this.Designation.Short==''){
      isValid = false;
      this.showMessage('warning', 'Short form is required.');
    }
    return isValid;
  }
  add() {    
    if(!this.validateForm()){
      return;
    }
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    //this.Job.CreateBy = this.authService.UserInfo.UserID;
    this.httpClient.post(this.authService.baseURL + '/api/Designation', this.Designation,{headers: oHttpHeaders}).subscribe((res) => {
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

  edit(item:any){
    this.Designation ={
      DesignateId:item.DesignateId,
      Name:item.Name,
      Short:item.Short,
      };
      this.isList = false;
  }

  update() {
    if(!this.validateForm()){
      return;
    }
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    //this.Designation.UpdateBy = this.authService.UserInfo.UserID;
    this.httpClient.put(this.authService.baseURL + '/api/Designation', this.Designation,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res == true){
        this.isList = true;
        this.get();
        this.showMessage('success', 'data updated.');
      }else{
        this.showMessage('error', 'error occurred.');
      }
    });
  }

  remove(item:any){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.delete(this.authService.baseURL + '/api/Designation/' + this.Designation.DesignateId,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res == true){
        this.get();
        this.showMessage('success', 'data removed.');
      }else{
        this.showMessage('error', 'error occurred.');
      }
    });    
  }
  search(){};


  Designation:{
    DesignateId:number,
    Name:string,
    Short:string,
  }={
    DesignateId:0,
    Name:'',
    Short:'',
  };

  listDesignation:any =[{"DesignateId":1,"Name":"Chairman","Short":"C"},{"DesignateId":2,"Name":"Vice Chairman","Short":"VC"},{"DesignateId":3,"Name":"Managing Director","Short":"MD"},{"DesignateId":4,"Name":"Director","Short":"D"},{"DesignateId":5,"Name":"General Manager","Short":"GM"},{"DesignateId":6,"Name":"Joint General Manager","Short":"JGM"},{"DesignateId":7,"Name":"Deputy General Manager","Short":"DGM"},{"DesignateId":8,"Name":"Asst. General Manager","Short":"AGM"},{"DesignateId":9,"Name":"Chief Manager","Short":"CM"},{"DesignateId":10,"Name":"Sr. Manager","Short":"SM"},{"DesignateId":11,"Name":"Manager","Short":"M"},{"DesignateId":12,"Name":"Joint Manager","Short":"JM"},{"DesignateId":13,"Name":"Deputy Manager","Short":"DM"},{"DesignateId":14,"Name":"Asst. Manager","Short":"AM"},{"DesignateId":15,"Name":"Sr. Executive","Short":"SE"},{"DesignateId":16,"Name":"Executive","Short":"E"},{"DesignateId":17,"Name":"Jr. Executive","Short":"JE"},{"DesignateId":18,"Name":"Sr. Associate","Short":"SA"},{"DesignateId":20,"Name":"Assistant","Short":"A"}];
  designat:{
    DesignateId:number,
    Name:string,
    Short:string
  }={
    DesignateId:0,
    Name:'',
    Short:''
  };
  
  reset() {
    this.Designation ={
    DesignateId:0,
    Name:'',
    Short:'',
    };
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


  //#region paging varible
  pageIndex: number = 0;
  pageSize:number = 10;
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

}
