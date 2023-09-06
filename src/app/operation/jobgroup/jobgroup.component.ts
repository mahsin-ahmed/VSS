import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/services/common.service';

@Component({
  selector: 'app-jobgroup',
  templateUrl: './jobgroup.component.html',
  styleUrls: ['./jobgroup.component.css']
})
export class JobgroupComponent {
  constructor(private cs: CommonService, private httpClient: HttpClient) {
    this.get();
  }
  isList: boolean = true;
  // Job-group object declaration
  listJobGroup: any = [];
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
  // getting data from database for display
  baseUrl: string = 'http://localhost:56297';

  changePageSize(){
    this.get();
  }

  changePageNumber(pageIndex:number){
    this.pageIndex = pageIndex;
    this.get();
  }

  get() {
    this.httpClient.get(this.baseUrl + '/api/JobGroup?pi='+this.pageIndex+'&ps='+this.pageSize).subscribe((res) => {
      this.listJobGroup = res;
      //#region paging
      this.rowCount = this.listJobGroup.length > 0 ? this.listJobGroup[0].RowCount : 0;
      this.totalRowsInList = this.listJobGroup.length;
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

  addJobGroup() {
    this.httpClient.post(this.baseUrl + '/api/JobGroup', this.JobGroup).subscribe((res) => {
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
  updateJobGroup() {  
    this.httpClient.put(this.baseUrl + '/api/JobGroup', this.JobGroup).subscribe((res)=>{
      if(res == true){
          this.isList = true;
          this.get();
          this.showMessage('success', 'data updated.');
      } else{
          this.showMessage('error', 'error occurred.');
        }
    });
  }

  removeJobGroup(item:any){
    this.httpClient.delete(this.baseUrl + '/api/JobGroup/' + item.GroupId).subscribe((res)=>{
      if(res == true){
        this.get();
        this.showMessage('success', 'data removed.');
      }else{
        this.showMessage('error', 'error occurred.');
      }
    });  
  }

  JobGroup: {
    GroupId: number,
    Name: string
  } = {
      GroupId: 0,
      Name: ''
    };

  reset() {
    this.JobGroup ={
      GroupId: 0,
      Name:''
    };
  }

  editJobGroup(item: any) {
    this.JobGroup = {
      GroupId:item.GroupId,
      Name:item.Name
    };
    this.isList = false;
  }
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
}
