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
import { SrComponent } from './inventory/sr/sr.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch:'full' },
  //{ path: '**', redirectTo: '/login' },

  { path: 'invoice', component: InvoiceComponent },
  { path: 'payment', component: PaytranComponent },
  { path: 'transaction', component: PaytranComponent },

  { path: 'designation', component: DesignationComponent },
  { path: 'employee', component: EmployeeComponent },

  { path: 'brand', component: BrandComponent },
  { path: 'color', component: ColorComponent },
  { path: 'item', component: ItemComponent },
  { path: 'item-category', component: ItemcategoryComponent },
  { path: 'item-group', component: ItemgroupComponent },
  { path: 'item-price', component: ItempriceComponent },
  { path: 'manufacturer', component: ManufacturerComponent },
  { path: 'size', component: SizeComponent },
  { path: 'unit', component: UnitComponent },
  { path: 'store', component: WarehouseComponent, canActivate:[authGuard] },
  { path:'sr', component:SrComponent, canActivate:[authGuard] },

  { path: 'job-card', component: JobcardComponent, canActivate:[authGuard] },
  { path: 'client', component: ClientComponent, canActivate:[authGuard] },
  { path: 'job', component: JobComponent, canActivate:[authGuard] },
  { path: 'job-group', component: JobgroupComponent, canActivate:[authGuard] },
  { path: 'engine-size', component: EnginesizeComponent, canActivate:[authGuard] },

  { path: 'company', component: CompanyComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'menu-permission', component: MenupermissionComponent },
  { path: 'module', component: ModuleComponent },
  { path: 'role', component: RoleComponent },
  { path: 'user', component: UserComponent },
  { path: 'user-role', component: UserroleComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate:[authGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
