import { Component } from '@angular/core';
import { CommonService, toastPayload } from '../../services/common.service';
import { IndividualConfig } from 'ngx-toastr';

@Component({
  selector: 'app-itemcategory',
  templateUrl: './itemcategory.component.html',
  styleUrls: ['./itemcategory.component.css']
})
export class ItemcategoryComponent {
  listCategory:any=[{"Id":1,"Code":"Wheel","Name":"Wheel","IsActive":true},{"Id":2,"Code":"Engine","Name":"Engine","IsActive":true},{"Id":3,"Code":"Camber","Name":"Camber","IsActive":true},{"Id":4,"Code":"Ignition","Name":"Ignition","IsActive":true},{"Id":5,"Code":"Suspension ","Name":"Suspension","IsActive":true},{"Id":6,"Code":"Clutch","Name":"Clutch","IsActive":true},{"Id":7,"Code":"Brake","Name":"Brake","IsActive":true},{"Id":8,"Code":"Electrical","Name":"Electrical","IsActive":true},{"Id":9,"Code":"AC","Name":"AC","IsActive":true},{"Id":10,"Code":"Transmission","Name":"Transmission","IsActive":true},{"Id":11,"Code":"Steering","Name":"Steering","IsActive":true}];
  isList:boolean=true;
  toast!: toastPayload;
  constructor(private cs:CommonService) { 
  }

  //type: 'success', 'error', 'warning', 'info'
  //message: '<span>Action in '+type+'</span>',
  showMessage(type: string, message:string) {
    this.toast = {
      message:message,
      title: type.toUpperCase(),
      type: type,
      ic: {
        timeOut: 2500,
        closeButton: true,
      } as IndividualConfig,
    };
    this.cs.showToast(this.toast);
  }
}
