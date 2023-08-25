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

    listDesignate:any=[
      {DesignateId:1,Name:'Supervisor',Short:''},
      {DesignateId:2,Name:'Fore-Man',Short:''},        
      {DesignateId:2,Name:'Mechanic',Short:''}
    ];
    addEmployee():void{

    }
}
