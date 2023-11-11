import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IndividualConfig } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService, toastPayload } from 'src/app/services/common.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})
export class SupplierComponent {
  
  isList:boolean=true;
  isNew:boolean = true;
  phone:string = '';

  constructor(private cs:CommonService,
    private httpClient: HttpClient,
    public authService:AuthService) { 
    this.get();
  }

  get(){};
  reset(){};
  search(){};
  edit(item:any){};
  add(){};
  update(){};
  remove(Supplier:any){};
  listSupplier:any=[];

  Supplier:{
    Id:number,
    Code:number,
    Name:string,
    Country:string,
    Remarks:string,
    CreateBy:number,
    IsActive:boolean,
    CreateDate:'',
    UpdateDate:'',
    UpdateBy:number,
  }={
    Id:0,
    Code:0,
    Name:'',
    Country:'',
    Remarks:'',
    CreateBy:0,
    IsActive:false,
    CreateDate:'',
    UpdateDate:'',
    UpdateBy:0,
  };

  toast!: toastPayload;

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
