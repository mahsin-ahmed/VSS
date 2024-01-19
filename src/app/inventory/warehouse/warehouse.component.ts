import { Component } from '@angular/core';
import { CommonService, toastPayload } from '../../services/common.service';
import { IndividualConfig } from 'ngx-toastr';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent {
  constructor(private cs: CommonService, 
    private httpClient: HttpClient,
    public authService:AuthService) {
    this.get();
  }

  isList: boolean = true;
  Warehouse: {
    Id: number,
    Name: string
  } = {
      Id: 0,
      Name: ''
    };

    get() {
      const oHttpHeaders = new HttpHeaders(
        {
            'Token':this.authService.UserInfo.Token
        });
      this.httpClient.get(this.authService.baseURL + '/api/Warehouse?pi='+this.pageIndex+'&ps='+this.pageSize,{headers: oHttpHeaders}).subscribe((res) => {
        if(res){
          this.listWarehouse = res;
          //#region paging
          this.rowCount = this.listWarehouse.length > 0 ? this.listWarehouse[0].RowCount : 0;
          this.totalRowsInList = this.listWarehouse.length;
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

    update() { 
      const oHttpHeaders = new HttpHeaders(
        {
            'Token':this.authService.UserInfo.Token
        }); 
      this.httpClient.put(this.authService.baseURL + '/api/Warehouse', this.Warehouse,{headers: oHttpHeaders}).subscribe((res)=>{
        if(res == true){
            this.isList = true;
            this.get();
            this.showMessage('success', 'data updated.');
        } else{
            this.showMessage('error', 'error occurred.');
          }
      });
    }
  reset(){};
  edit(item: any) {
    this.Warehouse = {
      Id:item.Id,
      Name:item.Name
    };
    this.isList = false;
  }
  add(){};
  remove(item:any){};
  listWarehouse: any = [
    {name:"Warehouse 1", address:"Dhaka", rack:""},
  ];
  
  toast!: toastPayload;
  showMessage(type: string, message: string) {
    this.toast = {
      message: message,
      title: type.toUpperCase(),
      type: type,
      ic: {
        timeOut: 2500,
        closeButton: true,
      } as IndividualConfig,
    };
    this.cs.showToast(this.toast);
  }
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
  
}
