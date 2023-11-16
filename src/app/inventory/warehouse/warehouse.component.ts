import { Component } from '@angular/core';
import { CommonService, toastPayload } from '../../services/common.service';
import { IndividualConfig } from 'ngx-toastr';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent {
  listWH:any=[{"Id":1,"Name":"Front-Warehouse"},{"Id":2,"Name":"Back-Warehouse"},{"Id":3,"Name":"Home-Warehouse"}];
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
