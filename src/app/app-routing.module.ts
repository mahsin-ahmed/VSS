import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobcardComponent } from './operation/jobcard/jobcard.component';
import { AppComponent } from './app.component';
import { InvoiceComponent } from './bill/invoice/invoice.component';
import { ClientComponent } from './operation/client/client.component';
import { EmployeeComponent } from './hr/employee/employee.component';
import { DesignationComponent } from './hr/designation/designation.component';
import { PaytranComponent } from './bill/paytran/paytran.component';
import { BrandComponent } from './inventory/brand/brand.component';
import { ColorComponent } from './inventory/color/color.component';
import { ItemComponent } from './inventory/item/item.component';
import { ItemcategoryComponent } from './inventory/itemcategory/itemcategory.component';
import { ItemgroupComponent } from './inventory/itemgroup/itemgroup.component';
import { ItempriceComponent } from './inventory/itemprice/itemprice.component';
import { ManufacturerComponent } from './inventory/manufacturer/manufacturer.component';
import { SizeComponent } from './inventory/size/size.component';
import { UnitComponent } from './inventory/unit/unit.component';
import { WarehouseComponent } from './inventory/warehouse/warehouse.component';
import { SalepriceComponent } from './inventory/saleprice/saleprice.component';

import { CompanyComponent } from './security/company/company.component';
import { MenuComponent } from './security/menu/menu.component';
import { MenupermissionComponent } from './security/menupermission/menupermission.component';
import { ModuleComponent } from './security/module/module.component';
import { RoleComponent } from './security/role/role.component';
import { UserComponent } from './security/user/user.component';
import { UserroleComponent } from './security/userrole/userrole.component';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { EnginesizeComponent } from './operation/enginesize/enginesize.component';
import { JobgroupComponent } from './operation/jobgroup/jobgroup.component';
import { JobComponent } from './operation/job/job.component';
import { StorereqComponent } from './inventory/storereq/storereq.component';
import { StorereqrecComponent } from './inventory/storereqrec/storereqrec.component';
import { StoreretComponent } from './inventory/storeret/storeret.component';
import { StoreretrecComponent } from './inventory/storeretrec/storeretrec.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClientvehicleComponent } from './operation/clientvehicle/clientvehicle.component';
import { BrandmodelComponent } from './inventory/brandmodel/brandmodel.component';
import { SupplierComponent } from './inventory/supplier/supplier.component';
import { WorkgroupComponent } from './operation/workgroup/workgroup.component';
import { WorkgroupmemberComponent } from './operation/workgroupmember/workgroupmember.component';
import { StockComponent } from './inventory/stock/stock.component';
import { JcReqComponent } from './inventory/jc-req/jc-req.component';
import { PoComponent } from './purchase/po/po.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch:'full' },
  //{ path: '**', redirectTo: '/login' },

  { path: 'invoice', component: InvoiceComponent, canActivate:[authGuard] },
  { path: 'payment', component: PaytranComponent, canActivate:[authGuard] },
  { path: 'transaction', component: PaytranComponent, canActivate:[authGuard] },

  { path: 'designation', component: DesignationComponent, canActivate:[authGuard] },
  { path: 'employee', component: EmployeeComponent, canActivate:[authGuard] },

  { path: 'brand', component: BrandComponent, canActivate:[authGuard] },
  { path: 'brand-model', component: BrandmodelComponent, canActivate:[authGuard] },
  { path: 'supplier', component: SupplierComponent, canActivate:[authGuard] },
  { path: 'color', component: ColorComponent, canActivate:[authGuard] },
  { path: 'item', component: ItemComponent, canActivate:[authGuard] },
  { path: 'item-category', component: ItemcategoryComponent, canActivate:[authGuard] },
  { path: 'item-group', component: ItemgroupComponent, canActivate:[authGuard] },
  { path: 'item-price', component: ItempriceComponent, canActivate:[authGuard] },
  { path: 'manufacturer', component: ManufacturerComponent, canActivate:[authGuard] },
  { path: 'size', component: SizeComponent, canActivate:[authGuard] },
  { path: 'unit', component: UnitComponent, canActivate:[authGuard] }, 
  { path: 'store', component: WarehouseComponent, canActivate:[authGuard] },
  { path:'sr', component:StorereqComponent, canActivate:[authGuard] },
  { path:'store-req', component:StorereqComponent, canActivate:[authGuard] },
  { path:'store-req-rec', component:StorereqrecComponent, canActivate:[authGuard] },
  { path:'store-ret', component:StoreretComponent, canActivate:[authGuard] },
  { path:'store-ret-rec', component:StoreretrecComponent, canActivate:[authGuard] },
  {path:'sales-price', component:SalepriceComponent, canActivate:[authGuard]},
  {path:'stock', component:StockComponent, canActivate:[authGuard]},
  {path:'jc-req', component:JcReqComponent, canActivate:[authGuard]},

  { path: 'job-card', component: JobcardComponent, canActivate:[authGuard] },
  { path: 'client-vehicle', component: ClientvehicleComponent, canActivate:[authGuard] },
  { path: 'client', component: ClientComponent, canActivate:[authGuard] },
  { path: 'work-group', component: WorkgroupComponent, canActivate:[authGuard] },
  { path: 'work-group-member', component: WorkgroupmemberComponent, canActivate:[authGuard] },
  { path: 'job', component: JobComponent, canActivate:[authGuard] },
  { path: 'job-group', component: JobgroupComponent, canActivate:[authGuard] },
  { path: 'engine-size', component: EnginesizeComponent, canActivate:[authGuard] },

  { path: 'company', component: CompanyComponent, canActivate:[authGuard] },
  { path: 'menu', component: MenuComponent, canActivate:[authGuard] },
  { path: 'menu-permission', component: MenupermissionComponent, canActivate:[authGuard] },
  { path: 'module', component: ModuleComponent, canActivate:[authGuard] },
  { path: 'role', component: RoleComponent, canActivate:[authGuard] },
  { path: 'user', component: UserComponent, canActivate:[authGuard] },
  { path: 'user-role', component: UserroleComponent, canActivate:[authGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate:[authGuard] },

  { path: 'po', component: PoComponent, canActivate:[authGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
