import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { IndividualConfig } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService, toastPayload } from 'src/app/services/common.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
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
    this.httpClient.get(this.authService.baseURL + '/api/Company/GetCompany',{headers:oHttpHeaders}).subscribe((res)=>{
        if(res){
          this.listCompany = res;
        }else{
          this.showMessage('warning', 'Session expired, please login.');
        }
    });
  }

  edit(item: any) {
    this.Company = { 
      CompanyId: item.CompanyId,
      CompanyCode: item.CompanyCode,
      CompanyName: item.CompanyName,
      Description: item.Description,
      DateFormat: item.DateFormat,
      DecimalPlace: item.DecimalPlace,
      Bay: item.Bay,
      Vat: item.Vat,
      Address: item.Address,
      Phone: item.Phone,
      Email: item.Email,
      Website: item.Website,
      IsActive: item.IsActive,
    };
    this.isList = false;
  }

  validateForm():boolean{
    var isValid:boolean=true;
    if(this.Company.CompanyId==undefined||this.Company.CompanyId==null||this.Company.CompanyId==0){
      isValid = false;
      this.showMessage('warning', 'Company ID is required.');
    }
    return isValid
  }
  update(){
    if(!this.validateForm()){
      return;
    }    
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    //this.Company.CreateBy = this.authService.UserInfo.UserID;
    this.httpClient.put(this.authService.baseURL + '/api/Company', this.Company,{headers: oHttpHeaders}).subscribe((res) => {
      if (res == true) {
        this.isList = true;
        this.get();
        this.showMessage('success', 'data updated.');
      } else {
        this.showMessage('error', 'error occurred.');
      }
    });
  }


  reset(){};
  search(){};
  add(){};
  remove(Company:any){};


  listCompany:any=[];

  Company:{
    CompanyId:number,
    CompanyCode:string,
    CompanyName:string,
    Description:string,
    DateFormat:string,
    DecimalPlace:number,
    Bay:number,
    Vat:number,
    Address:string,
    Phone:string,
    Email:string,
    Website:string,
    IsActive:boolean
  }={
      CompanyId:1,
      CompanyCode:'01',
      CompanyName:"Car Solution",
      Description:"Nearby Evercare hospital, Bashundhara R\/A",
      DateFormat:"dd-MMM-yy",
      DecimalPlace:2,
      Bay:6,
      Vat:10,
      Address:"541-42, Ferajitola, Solmaith, Vatara, Dhaka-1212",
      Phone:"01755660906",
      Email:"vehiclesolutionbd@gmail.com",
      Website:"www.vehiclesolution.net",
      IsActive:true
    };

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

