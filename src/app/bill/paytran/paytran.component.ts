import { Component } from '@angular/core';

@Component({
  selector: 'app-paytran',
  templateUrl: './paytran.component.html',
  styleUrls: ['./paytran.component.css']
})
export class PaytranComponent {
  isList:boolean=true;
  switchView(view: string): void {
    if (view == 'form') {
      this.isList = false;
    } else {
      this.isList = true;
      //this.reset();
    }
  }
}
