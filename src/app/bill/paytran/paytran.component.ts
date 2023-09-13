import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService, toastPayload } from '../../services/common.service';
import { IndividualConfig } from 'ngx-toastr';

@Component({
  selector: 'app-paytran',
  templateUrl: './paytran.component.html',
  styleUrls: ['./paytran.component.css']
})
export class PaytranComponent {
  isList:boolean=true;
  listJobCard:any=[];
  baseUrl:string='http://localhost:56297';
  //#region paging varible
  pageIndex: number = 0;
  pageSize:number = 5;
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
  //#endregion
  toast!: toastPayload;

  constructor(private cs:CommonService,private httpClient: HttpClient) {
    this.get();
  }

  switchView(view: string): void {
    if (view == 'form') {
      this.isList = false;
    } else {
      this.isList = true;
      //this.reset();
    }
  }

  get(){
    this.httpClient.get(this.baseUrl + '/api/Invoice?pi='+this.pageIndex+'&ps='+this.pageSize+'&jcStatus=1').subscribe((res)=>{
      this.listJobCard = res;
      //#region paging
      this.rowCount = this.listJobCard.length > 0 ? this.listJobCard[0].RowCount : 0;
      this.totalRowsInList = this.listJobCard.length;
      this.pager.totalPages = Math.ceil(this.rowCount / this.pageSize);
      this.pager.pages = [];
      for(var i = 0; i<this.pager.totalPages; i++){
        this.pager.pages.push(i+1);
      }
      this.pageStart = (this.pageIndex * this.pageSize) + 1;
      this.pageEnd = (this.pageStart - 1) + this.totalRowsInList;
      //#endregion
    });
  }

}
