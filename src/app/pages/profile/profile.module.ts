import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMaskModule, IConfig } from 'ngx-mask';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileManagementComponent } from './profile-management/profile-management.component';
import { NbCardModule, NbCheckboxModule } from '@nebular/theme';
import { SmartTableService } from '../../@core/data/smart-table.service';

import { ThemeModule } from '../../@theme/theme.module';
import { NgxDatatableModule } from "@swimlane/ngx-datatable";

@NgModule({
    declarations: [
        ProfileManagementComponent,
    ],
    imports: [
        CommonModule,
        NgxMaskModule.forRoot(),
        ProfileRoutingModule,
        NbCardModule,
        NbCheckboxModule,
        ThemeModule,
        NgxDatatableModule,
    ],
    providers: [
        SmartTableService,
    ],
})
export class ProfileModule {
}
