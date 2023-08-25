import { Component } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
  Company:{
    CompanyId:number,
    CompanyName:string,
    Description:string,
    Bay:number,
    Vat:number
  }={
    CompanyId:1,
    CompanyName:'Car Solution',
    Description:'Baridhara, Dhaka',
    Bay:8,
    Vat:10
    };
    save():void{

    }
}
