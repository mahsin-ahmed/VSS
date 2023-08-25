import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { JobcardComponent } from './operation/jobcard/jobcard.component';
import { BrandComponent } from './inventory/brand/brand.component';
import { ClientComponent } from './operation/client/client.component';
import { ColorComponent } from './inventory/color/color.component';
import { CompanyComponent } from './security/company/company.component';
import { DesignationComponent } from './hr/designation/designation.component';
import { EmployeeComponent } from './hr/employee/employee.component';
import { ItemComponent } from './inventory/item/item.component';
import { ItemcategoryComponent } from './inventory/itemcategory/itemcategory.component';
import { ItemgroupComponent } from './inventory/itemgroup/itemgroup.component';
import { ItempriceComponent } from './inventory/itemprice/itemprice.component';
import { ManufacturerComponent } from './inventory/manufacturer/manufacturer.component';
import { MenupermissionComponent } from './security/menupermission/menupermission.component';
import { ModuleComponent } from './security/module/module.component';
import { InvoiceComponent } from './bill/invoice/invoice.component';
import { PaytranComponent } from './bill/paytran/paytran.component';
import { RoleComponent } from './security/role/role.component';
import { SizeComponent } from './inventory/size/size.component';
import { UnitComponent } from './inventory/unit/unit.component';
import { UserComponent } from './security/user/user.component';
import { UserroleComponent } from './security/userrole/userrole.component';
import { WarehouseComponent } from './inventory/warehouse/warehouse.component';
import { PoComponent } from './inventory/po/po.component';
import { LoginComponent } from './login/login.component';
import { JobComponent } from './operation/job/job.component';
import { JobgroupComponent } from './operation/jobgroup/jobgroup.component';
import { EnginesizeComponent } from './operation/enginesize/enginesize.component';

@NgModule({
  declarations: [
    AppComponent,
    JobcardComponent,
    BrandComponent,
    ClientComponent,
    ColorComponent,
    CompanyComponent,
    DesignationComponent,
    EmployeeComponent,
    ItemComponent,
    ItemcategoryComponent,
    ItemgroupComponent,
    ItempriceComponent,
    ManufacturerComponent,
    MenupermissionComponent,
    ModuleComponent,
    InvoiceComponent,
    PaytranComponent,
    RoleComponent,
    SizeComponent,
    UnitComponent,
    UserComponent,
    UserroleComponent,
    WarehouseComponent,
    PoComponent,
    LoginComponent,
    JobComponent,
    JobgroupComponent,
    EnginesizeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
