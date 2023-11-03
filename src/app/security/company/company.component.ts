import { Component } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {
  Company:{"CompanyId":number,"CompanyCode":string,"CompanyName":string,"Description":string,"DateFormat":string,"DecimalPlace":number,"Bay":number,"Vat":number,"Address":string,"Phone":string,"Email":string,"Website":string,"IsActive":boolean}={"CompanyId":1,"CompanyCode":"01","CompanyName":"Car Solution","Description":"Nearby Evercare hospital, Bashundhara R\/A","DateFormat":"dd-MMM-yy","DecimalPlace":2,"Bay":6,"Vat":10,"Address":"541-42, Ferajitola, Solmaith, Vatara, Dhaka-1212","Phone":"01755660906","Email":"vehiclesolutionbd@gmail.com","Website":"www.vehiclesolution.net","IsActive":true};
    save():void{

    }
}
