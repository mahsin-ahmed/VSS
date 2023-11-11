import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { IndividualConfig } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/auth.service';
import { CommonService, toastPayload } from 'src/app/services/common.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {

  isList: boolean = true;
  isNew: boolean = true;
  phone: string = '';
  toast!: toastPayload;

  constructor(private cs: CommonService,
    private httpClient: HttpClient,
    public authService: AuthService) {
    this.get();
    this.getDesignationList();
  }

  get() {
    const oHttpHeaders = new HttpHeaders(
      {
        'Token': this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/Employee?pi=' + this.pageIndex + '&ps=' + this.pageSize + '&phone=' + this.phone, { headers: oHttpHeaders }).subscribe((res) => {
      if (res) {
        this.listEmployee = res;

        //#region paging
        this.rowCount = this.listEmployee.length > 0 ? this.listEmployee[0].RowCount : 0;
        this.totalRowsInList = this.listEmployee.length;
        this.pager.totalPages = Math.ceil(this.rowCount / this.pageSize);
        this.pager.pages = [];
        for (var i = 0; i < this.pager.totalPages; i++) {
          this.pager.pages.push(i + 1);
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
    if(this.Employee.FirstName==undefined||this.Employee.FirstName==null||this.Employee.FirstName==''){
      isValid = false;
      this.showMessage('warning', 'First name is required.');
    }
    if(this.Employee.MiddleName==undefined||this.Employee.MiddleName==null||this.Employee.MiddleName==''){
      isValid = false;
      this.showMessage('warning', 'Middle name is required.');
    }
    if(this.Employee.LastName==undefined||this.Employee.LastName==null||this.Employee.LastName==''){
      isValid = false;
      this.showMessage('warning', 'Last name is required.');
    }
    if(this.Employee.DesignateId==undefined||this.Employee.DesignateId==null||this.Employee.DesignateId==0){
      isValid = false;
      this.showMessage('warning', 'Designation is required.');
    }
    return isValid;
  }
  add() {      
    if(!this.validateForm()){
      return;
    }
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.Employee.CreatedBy = this.authService.UserInfo.UserID;
    this.httpClient.post(this.authService.baseURL + '/api/Employee', this.Employee,{headers: oHttpHeaders}).subscribe((res) => {
      if (res == true) {
        this.isList = true;
        this.get();
        this.reset();
        this.showMessage('success', 'data added.');
      } else {
        this.showMessage('error', 'error occurred.');
      }
    });
   };

   edit(item:any){
    this.Employee ={
      EmployeeId:item.EmployeeId,
      FirstName:item.FirstName,
      MiddleName:item.MiddleName,
      LastName:item.LastName,
      Mobile:item.Mobile,
      Email:item.Email,
      NID:item.NID,
      CreatedBy:item.CreatedBy,
      DesignateId:item.DesignateId,
      };
      this.isList = false;
  }

  update() {
    if(!this.validateForm()){
      return;
    }
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.Employee.CreatedBy = this.authService.UserInfo.UserID;
    this.httpClient.put(this.authService.baseURL + '/api/Employee', this.Employee,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res == true){
        this.isList = true;
        this.get();
        this.showMessage('success', 'data updated.');
      }else{
        this.showMessage('error', 'error occurred.');
      }
    });
  }
  reset() {
    this.Employee ={
    EmployeeId:0,
    FirstName:'',
    MiddleName:'',
    LastName:'',
    Mobile:'',
    Email:'',
    NID:'',
    CreatedBy:0,
    DesignateId:0,
    };
  }

  remove(item:any){
    const oHttpHeaders = new HttpHeaders(
      {
          'Token':this.authService.UserInfo.Token
      });
    this.httpClient.delete(this.authService.baseURL + '/api/Employee/' + this.Employee.EmployeeId,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res == true){
        this.get();
        this.showMessage('success', 'data removed.');
      }else{
        this.showMessage('error', 'error occurred.');
      }
    });    
  }
  search() { };

  Employee: {
    EmployeeId: number,
    FirstName: string,
    MiddleName: string,
    LastName: string,
    Mobile: string,
    Email: string,
    NID: string,
    DesignateId: number,
    CreatedBy:number,
  } = {
      EmployeeId: 0,
      FirstName: '',
      MiddleName: '',
      LastName: '',
      Mobile: '',
      Email: '',
      NID: '',
      DesignateId: 0,
      CreatedBy:0,
    };

  listEmployee: any = [];

  listDesignation: any = [];
  getDesignationList() {
    const oHttpHeaders = new HttpHeaders(
      {
        'Token': this.authService.UserInfo.Token
      });
    this.httpClient.get(this.authService.baseURL + '/api/Designation?pi='+this.pageIndex+'&ps='+this.pageSize+'&phone='+this.phone,{headers: oHttpHeaders}).subscribe((res)=>{
      if(res){
        this.listDesignation = res;
      }else{
        this.showMessage('warning', 'Session expired, please login.');
      }
    });
  }

  //type: 'success', 'error', 'warning', 'info'
  //message: '<span>Action in '+type+'</span>',
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


  //#region paging varible
  pageIndex: number = 0;
  pageSize: number = 10;
  rowCount: number = 0;
  listPageSize: any = [5, 10, 20];
  pageStart: number = 0;
  pageEnd: number = 0;
  totalRowsInList: number = 0;
  pagedItems: any = [];
  pager: {
    pages: any,
    totalPages: number
  } = {
      pages: [],
      totalPages: 0
    };

  changePageSize() {
    this.pageIndex = 0;
    this.get();
  }

  changePageNumber(pageIndex: number) {
    this.pageIndex = pageIndex;
    this.get();
  }
  //#endregion
}
