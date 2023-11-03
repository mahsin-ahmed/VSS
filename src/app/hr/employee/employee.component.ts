import { Component } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent {
  isList:boolean=true;
  Employee:{
    EmployeeId:number,
    FirstName:string,
    MiddleName:string,
    LastName:string,
    Phone:string,
    Email:string,
    DesignateId:number
    }={
      EmployeeId:0,
    FirstName:'',
    MiddleName:'',
    LastName:'',
    Phone:'',
    Email:'',
    DesignateId:0
    };

    listEmployee:any=[{"EmployeeId":1,"FirstName":"Simon","IsConfirm":false},{"EmployeeId":2,"FirstName":"Sohag","IsConfirm":false},{"EmployeeId":3,"FirstName":"Alom","IsConfirm":false},{"EmployeeId":4,"FirstName":"Sumon","IsConfirm":false},{"EmployeeId":5,"FirstName":"Rahim","IsConfirm":false},{"EmployeeId":6,"FirstName":"Ali","IsConfirm":false},{"EmployeeId":7,"FirstName":"Ripon","IsConfirm":false},{"EmployeeId":8,"FirstName":"Arif","IsConfirm":false},{"EmployeeId":9,"FirstName":"Rajib","IsConfirm":false}];
    listDesignate:any=[
      {DesignateId:1,Name:'Supervisor',Short:''},
      {DesignateId:2,Name:'Fore-Man',Short:''},        
      {DesignateId:2,Name:'Mechanic',Short:''}
    ];
    addEmployee():void{

    }
}
