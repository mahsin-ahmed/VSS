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
    this.getJobGroupList();
  }
  isList: boolean = true;
  // Job-group object declaration
  listJobGroup: any = [];


  // getting data from database for display
  baseUrl: string = 'http://localhost:56297';


  getJobGroupList() {
    this.httpClient.get(this.baseUrl + '/api/JobGroup').subscribe((res) => {
      this.listJobGroup = res;
    });
  }

  addJobGroup() {
    this.httpClient.post(this.baseUrl + '/api/JobGroup', this.JobGroup).subscribe((res) => {
      if (res == true) {
        this.isList = true;
        this.getJobGroupList();
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
      this.getJobGroupList();
      this.showMessage('success', 'data updated.');
    }else{
      this.showMessage('error', 'error occurred.');
    }
});
  }

  removeJobGroup(item:any){
    this.httpClient.delete(this.baseUrl + '/api/JobGroup/' + item.GroupId).subscribe((res)=>{
      if(res == true){
        this.getJobGroupList();
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
