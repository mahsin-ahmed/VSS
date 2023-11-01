import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-clientvehicle',
  templateUrl: './clientvehicle.component.html',
  styleUrls: ['./clientvehicle.component.css']
})
export class ClientvehicleComponent {

  constructor(private cs: CommonService, 
    private httpClient: HttpClient,
    private authService:AuthService) {
    this.get();
  }
  isList: boolean = true;
  listClientVehicle: any = [];

  get() {
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/ClientVehicle?pi='+this.pageIndex+'&ps='+this.pageSize,{headers: oHttpHeaders}).subscribe((res) => {
      this.listClientVehicle = res;
      //#region paging
      this.rowCount = this.listClientVehicle.length > 0 ? this.listClientVehicle[0].RowCount : 0;
      this.totalRowsInList = this.listClientVehicle.length;
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
  add(){}
  edit(item: any){}
  update(){}

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

  changePageSize(){
    this.pageIndex = 0;
    this.get();
  }

  changePageNumber(pageIndex:number){
    this.pageIndex = pageIndex;
    this.get();
  }
  //#endregion

  JobGroup: {
    GroupId: number,
    Name: string
  } = {
      GroupId: 0,
      Name: ''
    };
  switchView(view: string): void {
    if (view == 'form') {
      this.isList = false;
    } else {
      this.isList = true;
      this.reset();
      this.pageIndex = 0;
      this.get();
    }
  }

  reset() {
    };

}
