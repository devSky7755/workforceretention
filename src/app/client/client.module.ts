import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientRoutingModule} from './client-routing.module';
import {HomeComponent} from './home/home.component';
import {ContactComponent} from './contact/contact.component';
import {ProductComponent} from './product/product.component';
import {DetailsComponent} from './product/details/details.component';
import {AuthenticationComponent} from './authentication/authentication.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {NbCardModule, NbDatepickerModule, NbLayoutModule} from "@nebular/theme";
import {PageNameComponent} from './page-name/page-name.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { DashboardComponent } from './dashboard/dashboard.component';
import { QuestionsComponent } from './questions/questions.component';
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import { ProfileComponent } from './profile/profile.component';
import { EmployeeSurveyDownloadComponent } from './employee-survey-download/employee-survey-download.component';
import { ManagerReportComponent } from './manager-report/manager-report.component';
import { ReportsComponent } from './reports/reports.component';
import {NgxChartsModule} from "@swimlane/ngx-charts";
import { ManagerReportPdfComponent } from './manager-report-pdf/manager-report-pdf.component';
import { FlexibleOptionsComponent } from './flexible-options/flexible-options.component';
import { AboutComponent } from './about/about.component';
import {RECAPTCHA_SETTINGS, RecaptchaModule, RecaptchaSettings} from "ng-recaptcha";
import {RecaptchaFormsModule} from "ng-recaptcha/forms";
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
    declarations: [
        HomeComponent,
        ContactComponent,
        ProductComponent,
        DetailsComponent,
        AuthenticationComponent,
        HeaderComponent,
        FooterComponent,
        PageNameComponent,
        DashboardComponent,
        QuestionsComponent,
        ProfileComponent,
        EmployeeSurveyDownloadComponent,
        ManagerReportComponent,
        ReportsComponent,
        ManagerReportPdfComponent,
        FlexibleOptionsComponent,
        AboutComponent
    ],
    imports: [
        CommonModule,
        ClientRoutingModule,
        FlexLayoutModule,
        NbCardModule,
        NbLayoutModule,
        FormsModule,
        NgxDatatableModule,
        ReactiveFormsModule,
        NbDatepickerModule,
        NgxChartsModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        SlickCarouselModule
    ],
    providers: [{
        provide: RECAPTCHA_SETTINGS,
        useValue: {
            siteKey: '6LdKKKgUAAAAAAeeeUSsJ9VonY93gUZlIpYU3Qp8',
        } as RecaptchaSettings,
    }]
})
export class ClientModule {
}
