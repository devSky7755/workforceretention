import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OfficeAdminRoutingModule} from './office-admin-routing.module';
import {UserManagementComponent} from './user-management/user-management.component';
import {PermissionManagementComponent} from './permission-management/permission-management.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {NbCardModule, NbCheckboxModule} from '@nebular/theme';
import {SmartTableService} from '../../@core/data/smart-table.service';
import {AddEditUserComponent} from './user-management/add-edit-user/add-edit-user.component';
import {AddEditPermissionComponent} from './permission-management/add-edit-permission/add-edit-permission.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {ButtonsModule} from "../forms/buttons/buttons.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
    declarations: [
        UserManagementComponent,
        PermissionManagementComponent,
        AddEditUserComponent,
        AddEditPermissionComponent
    ],
    imports: [
        CommonModule,
        OfficeAdminRoutingModule,
        Ng2SmartTableModule,
        NbCardModule,
        NgxDatatableModule,
        ButtonsModule,
        FormsModule,
        ReactiveFormsModule,
        NbCheckboxModule
    ],
    providers: [
        SmartTableService,
    ],
})
export class OfficeAdminModule {
}
