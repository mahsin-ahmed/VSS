import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/services/common.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent {
  constructor(private cs: CommonService, private httpClient: HttpClient) {
    this.get();
    this.getJobGroup();
  }
  isList: boolean = true;
  baseUrl: string = 'http://localhost:56297';

  // Pagination part Start
  //----------------------------------------------------------------------------
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

  changePageSize(){
    this.pageIndex = 0;
    this.get();
  }
  changePageNumber(pageIndex:number){
    this.pageIndex = pageIndex;
    this.get();
  }

  // Pagination part End
  //----------------------------------------------------------------------

  listJobs: any = [];

  /*
  get() {
    this.httpClient.get(this.baseUrl + '/api/Job').subscribe((res) => {
      this.listJobs = res;
    });
  }
  */
  get() {
    this.httpClient.get(this.baseUrl + '/api/Job?pi='+this.pageIndex+'&ps='+this.pageSize).subscribe((res) => {
      this.listJobs = res;
      //#region paging
      this.rowCount = this.listJobs.length > 0 ? this.listJobs[0].RowCount : 0;
      this.totalRowsInList = this.listJobs.length;
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

  addJob() {
    this.httpClient.post(this.baseUrl + '/api/Job', this.Job).subscribe((res) => {
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
  
  editJob(item: any) {
    this.Job = {
      JobId: item.JobId,
      Description: item.Description,
      JobGroupId: item.JobGroupId,
      A: item.A,
      B: item.B,
      C: item.C,
      DurationA: item.DurationA,
      DurationB: item.DurationB,
      DurationC: item.DurationC
    };
    this.isList = false;
  }
  updateJob() {
    this.httpClient.put(this.baseUrl + '/api/Job', this.Job).subscribe((res) => {
      if (res == true) {
        this.isList = true;
        this.get();
        this.showMessage('success', 'data updated.');
      } else {
        this.showMessage('error', 'error occurred.');
      }
    });
  }

  Job: {
    JobId: number,
    Description: string,
    JobGroupId: number,
    A: number,
    B: number,
    C: number,
    DurationA: number,
    DurationB: number,
    DurationC: number
  } = {
      JobId: 0,
      Description: '',
      JobGroupId: 0,
      A: 0,
      B: 0,
      C: 0,
      DurationA: 0,
      DurationB: 0,
      DurationC: 0
    };

    listJobGroup:any = [];
    
    getJobGroup(){
      this.httpClient.get(this.baseUrl + '/api/JobCard/GetJobGroup').subscribe((res)=>{
          this.listJobGroup = res;
      });
    }

    removeJob(item:any){
      this.httpClient.delete(this.baseUrl + '/api/Job/' + item.JobId).subscribe((res)=>{
        if(res == true){
          this.get();
          this.showMessage('success', 'data removed.');
        }else{
          this.showMessage('error', 'error occurred.');
        }
      });      
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

  reset() {
    this.Job = {
      JobId: 0,
      Description: '',
      JobGroupId: 0,
      A: 0,
      B: 0,
      C: 0,
      DurationA: 0,
      DurationB: 0,
      DurationC: 0
    };
  }
}
