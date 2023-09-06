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
  pageNumber: number = 0;
  pageSize:number = 10;
  pageCount:number = 10;
  listPageSize:any = [5,10,20];
  pageStart:number = 0;
  pageEnd:number = 0;
  totalRowsInList:number=0;
  pagedItems:any = [];
  pager:{
    pages:any,
    currentPage:number,
    totalPages:number
  } = {
    currentPage:0,
    pages:[],
    totalPages:0
  };  
  // getting data from database for display
  baseUrl: string = 'http://localhost:56297';

  changePageSize(){
    this.get();
  }

  isPage:boolean = false;
  changePageNumber(pageNumber:number, isPage:boolean){
    this.pager.currentPage =  pageNumber;
    this.pageNumber = pageNumber;
    this.isPage = isPage;
    if (isPage) {
      this.get();
    } else {
      this.pagedItems = this.listJobGroup;
    }
  }

  get() {
    this.httpClient.get(this.baseUrl + '/api/JobGroup?pn='+this.pageNumber+'&ps='+this.pageSize).subscribe((res) => {
      this.listJobGroup = res;
      this.pageCount = this.listJobGroup.length > 0 ? this.listJobGroup[0].PageCount : 0;
      this.totalRowsInList = this.listJobGroup.length;
      this.pager.totalPages = Math.ceil(this.pageCount / this.pageSize);
      this.pager.pages = [];
      for(var i = 0; i<this.pager.totalPages; i++){
        this.pager.pages.push(i+1);
      }

      //paging info start   
      if (this.pageNumber == 0 || this.pageNumber == 1) {
          this.pageStart = 1;
          if (this.totalRowsInList < this.pageSize) {
              this.pageEnd = this.totalRowsInList;
          } else {
              this.pageEnd = this.pageSize;
          }
      } else {
          this.pageStart = (this.pageNumber - 1) * this.pageSize + 1;
          this.pageEnd = (this.pageStart - 1) + this.totalRowsInList;
      }
      //paging info end
      if (false)
          this.changePageNumber(this.pageNumber, false);
      else
          this.pagedItems = this.listJobGroup;
          this.pager.currentPage = this.pageNumber;
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
    }else{
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
    }
  }
}
