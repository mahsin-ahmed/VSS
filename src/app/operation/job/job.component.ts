import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { IndividualConfig } from 'ngx-toastr';
import { CommonService, toastPayload } from 'src/app/services/common.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent {
  constructor(private cs: CommonService, 
    private httpClient: HttpClient,
    public authService:AuthService) {
    this.get();
    this.getJobGroup();
  }
  isList: boolean = true;
  phone:string = '';
  //baseUrl: string = 'http://localhost:56297';

  //#region Pagination 1
  pageIndex: number = 0;
  pageSize:number = 10;
  rowCount:number = 0;
  listPageSize:any = [5,10,20];
  pageStart:number = 0;
  pageEnd:number = 0;
  totalRowsInList:number=0;
  pagedItems:any = [];
  pager:{
    pagesSource:any,
    pages:any,
    totalPages:number
  } = {
    pagesSource:[],
    pages:[],
    totalPages:0
  };  
  changePageSize(){
    this.pageIndex = 0;
    this.pagerIndex = 10;
    this.get();
  }
  changePageNumber(pageIndex:number){
    this.pageIndex = pageIndex;
    this.pagerIndex = pageIndex < 10 ? 10 : Math.ceil((pageIndex + 1) / this.pageIndexSize) * this.pageIndexSize;
    this.get();
  }
  pageIndexSize:number = 10;
  pagerIndex:number = 10;
  pageDot:boolean=true;
  //#endregion
  jobDescription:string = '';
  jobGroupId:number=0;
  listJobs: any = [];
  get() : void {
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.httpClient.get(this.authService.baseURL + '/api/Job?description='+this.jobDescription+'&jobGroupId='+this.jobGroupId+'&pi='+this.pageIndex+'&ps='+this.pageSize,{headers: oHttpHeaders}).subscribe((res) => {
      if(res) {
        this.listJobs = res;
        //#region Pagination 2
        this.rowCount = this.listJobs.length > 0 ? this.listJobs[0].RowCount : 0;
        this.totalRowsInList = this.listJobs.length;
        this.pager.totalPages = Math.ceil(this.rowCount / this.pageSize);
        this.pager.pagesSource = [];
        for(var i = 0; i < this.pager.totalPages; i++){
          this.pager.pagesSource.push(i+1);
        }
        this.pager.pages = [];
        var pagerIn = this.pager.totalPages < this.pagerIndex ? this.pager.totalPages : this.pagerIndex;
        this.pageDot = this.pager.totalPages < this.pagerIndex ? false : true;
        for(var i = this.pagerIndex - this.pageIndexSize; i < pagerIn; i++) {
          this.pager.pages.push(i+1);
        }
        this.pageStart = (this.pageIndex * this.pageSize) + 1;
        this.pageEnd = (this.pageStart - 1) + this.totalRowsInList;
        //#endregion
      } else {
        this.showMessage('warning', 'Session expired, please login.');
      }
    });
  }

  validateForm():boolean{
    var isValid:boolean=true;
    if(this.Job.Description==undefined||this.Job.Description==null||this.Job.Description==""){
      isValid = false;
      this.showMessage('warning', 'Job Description is required.');
    }
    if(this.Job.JobGroupId==undefined||this.Job.JobGroupId==null||this.Job.JobGroupId==0){
      isValid = false;
      this.showMessage('warning', 'Job Group is required.');
    }
    return isValid
  }

  addJob() {
    if(!this.validateForm()){
      return;
    }
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.Job.CreateBy = this.authService.UserInfo.UserID;
    this.httpClient.post(this.authService.baseURL + '/api/Job', this.Job,{headers: oHttpHeaders}).subscribe((res) => {
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
      DurationC: item.DurationC,
      CreateBy:item.CreateBy
    };
    this.isList = false;
  }
  updateJob() {
    const oHttpHeaders = new HttpHeaders(
    {
        'Token':this.authService.UserInfo.Token
    });
    this.Job.CreateBy = this.authService.UserInfo.UserID;
    this.httpClient.put(this.authService.baseURL + '/api/Job', this.Job,{headers: oHttpHeaders}).subscribe((res) => {
      if (res == true) {
        this.isList = true;
        this.get();
        this.showMessage('success', 'data updated.');
      } else {
        this.showMessage('error', 'error occurred.');
      }
    });
  }

  search(){
    this.get();
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
    DurationC: number,
    CreateBy:number
  } = {
      JobId: 0,
      Description: '',
      JobGroupId: 0,
      A: 0,
      B: 0,
      C: 0,
      DurationA: 0,
      DurationB: 0,
      DurationC: 0,
      CreateBy:0
    };

    listJobGroup:any = [];
    
    getJobGroup(){
      const oHttpHeaders = new HttpHeaders(
        {
            'Token':this.authService.UserInfo.Token
        });
      this.httpClient.get(this.authService.baseURL + '/api/JobCard/GetJobGroup',{headers: oHttpHeaders}).subscribe((res)=>{
          this.listJobGroup = res;
      });
    }

    removeJob(item:any){
      const oHttpHeaders = new HttpHeaders(
        {
            'Token':this.authService.UserInfo.Token
        });
      this.httpClient.delete(this.authService.baseURL + '/api/Job/' + item.JobId,{headers: oHttpHeaders}).subscribe((res)=>{
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
      DurationC: 0,
      CreateBy:0
    };
  }
}
